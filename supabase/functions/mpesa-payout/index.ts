import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const mpesaApiKey = Deno.env.get('MPESA_API_KEY') ?? ''
const mpesaApiSecret = Deno.env.get('MPESA_API_SECRET') ?? ''
const mpesaShortcode = Deno.env.get('MPESA_SHORTCODE') ?? ''
const mpesaPasskey = Deno.env.get('MPESA_PASSKEY') ?? ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { transaction_id } = await req.json()

    // Get transaction details
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .select('*, wage_requests!inner(*)')
      .eq('id', transaction_id)
      .single()

    if (txError) throw txError
    if (!transaction) throw new Error('Transaction not found')
    if (transaction.status !== 'ready') throw new Error('Transaction not ready for payout')

    // Get employee details
    const { data: employee, error: empError } = await supabase
      .from('employees')
      .select('phone')
      .eq('id', transaction.wage_requests.employee_id)
      .single()

    if (empError) throw empError
    if (!employee?.phone) throw new Error('Employee phone number not found')

    // Generate M-Pesa timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const password = btoa(`${mpesaShortcode}${mpesaPasskey}${timestamp}`)

    // Initiate M-Pesa payout
    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mpesaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        InitiatorName: mpesaShortcode,
        SecurityCredential: password,
        CommandID: 'BusinessPayment',
        Amount: transaction.amount,
        PartyA: mpesaShortcode,
        PartyB: employee.phone,
        Remarks: `Wage advance for ${transaction.wage_requests.id}`,
        QueueTimeOutURL: `${supabaseUrl}/functions/v1/mpesa-timeout`,
        ResultURL: `${supabaseUrl}/functions/v1/mpesa-result`,
        Occasion: 'Wage Advance',
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.errorMessage || 'M-Pesa API error')
    }

    // Update transaction status
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'processing',
        meta: {
          mpesa_request_id: result.ConversationID,
          mpesa_originator_conversation_id: result.OriginatorConversationID,
        },
      })
      .eq('id', transaction_id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
}) 