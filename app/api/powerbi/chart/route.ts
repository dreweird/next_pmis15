import { db } from "../../../db";

export  async function GET(){
  try {
    const result = await db.$queryRaw`
   SELECT 
  u.type,
  res.h1,
  res.h3,  
  res.h4, 
  res.user_id, 
  res.month,
  CASE res.month 
    WHEN 'Jan' THEN '01/01/2025'
    WHEN 'Feb' THEN '02/01/2025'
    WHEN 'Mar' THEN '03/01/2025'
    WHEN 'Apr' THEN '04/01/2025'
    WHEN 'May' THEN '05/01/2025'
    WHEN 'Jun' THEN '06/01/2025'
    WHEN 'Jul' THEN '07/01/2025'
    WHEN 'Aug' THEN '08/01/2025'
    WHEN 'Sep' THEN '09/01/2025'
    WHEN 'Oct' THEN '10/01/2025'
    WHEN 'Nov' THEN '11/01/2025'
    WHEN 'Dec' THEN '12/01/2025'
  END AS date,
  SUM(res.p_target) AS p_target,
  SUM(res.p_accomplishment) AS p_accomplishment,
  SUM(res.ot_target) AS ot_target,
  SUM(res.o_accomplishment) AS o_accomplishment,
  SUM(res.d_target) AS d_target,
  SUM(res.d_accomplishment) AS d_accomplishment
FROM (
    -- Targets
    SELECT user_id, 'Jan' AS month, h1,h3, h4,  jan_pt AS p_target, NULL AS p_accomplishment, NULL AS ot_target, NUll AS o_accomplishment, NULL AS d_target, NULL AS d_accomplishment FROM mfo
    UNION ALL SELECT user_id, 'Feb', h1,h3, h4, feb_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Mar', h1,h3, h4, mar_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Apr', h1,h3, h4, apr_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'May', h1,h3, h4, may_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jun', h1,h3, h4, jun_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jul', h1,h3, h4, jul_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Aug', h1,h3, h4, aug_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Sep', h1,h3, h4, sep_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Oct', h1,h3, h4, oct_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Nov', h1,h3, h4,  nov_pt, NULL, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Dec', h1,h3, h4, dec_pt, NULL, NULL, NULL, NULL, NULL FROM mfo

    -- Accomplishments
    UNION ALL SELECT user_id, 'Jan', h1, h3, h4, NULL, jan_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Feb', h1, h3, h4, NULL, feb_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Mar', h1, h3, h4, NULL, mar_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Apr', h1, h3, h4, NULL, apr_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'May', h1, h3, h4, NULL, may_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jun', h1, h3, h4, NULL, jun_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jul', h1, h3, h4, NULL, jul_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Aug', h1, h3, h4, NULL, aug_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Sep', h1, h3, h4, NULL, sep_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Oct', h1, h3, h4, NULL, oct_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Nov', h1, h3, h4, NULL, nov_pa, NULL, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Dec', h1, h3, h4, NULL, dec_pa, NULL, NULL, NULL, NULL FROM mfo
    
    -- OT
    UNION ALL SELECT user_id, 'Jan', h1, h3, h4, NULL, NULL, jan_ot + jan_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Feb', h1, h3, h4, NULL, NULL, feb_ot + feb_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Mar', h1, h3, h4, NULL, NULL, mar_ot + mar_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Apr', h1, h3, h4, NULL, NULL, apr_ot + apr_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'May', h1, h3, h4, NULL, NULL, may_ot + may_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jun', h1, h3, h4, NULL, NULL, jun_ot + jun_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jul', h1, h3, h4, NULL, NULL, jul_ot + jul_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Aug', h1, h3, h4, NULL, NULL, aug_ot + aug_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Sep', h1, h3, h4, NULL, NULL, sep_ot + sep_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Oct', h1, h3, h4, NULL, NULL, oct_ot + oct_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Nov', h1, h3, h4, NULL, NULL, nov_ot + nov_otc, NULL, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Dec', h1, h3, h4, NULL, NULL, dec_ot + dec_otc, NULL, NULL, NULL FROM mfo
    
    -- OA
    UNION ALL SELECT user_id, 'Jan', h1,h3,h4, NULL, NULL, NULL, jana_ot + jana_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Feb', h1,h3,h4, NULL, NULL, NULL, feba_ot + feba_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Mar', h1,h3,h4, NULL, NULL, NULL, mara_ot + mara_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Apr', h1,h3,h4, NULL, NULL, NULL, apra_ot + apra_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'May', h1,h3,h4, NULL, NULL, NULL, maya_ot + maya_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jun', h1,h3,h4, NULL, NULL, NULL, juna_ot + juna_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jul', h1,h3,h4, NULL, NULL, NULL, jula_ot + jula_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Aug', h1,h3,h4, NULL, NULL, NULL, auga_ot + auga_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Sep', h1,h3,h4, NULL, NULL, NULL, sepa_ot + sepa_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Oct', h1,h3,h4, NULL, NULL, NULL, octa_ot + octa_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Nov', h1,h3,h4, NULL, NULL, NULL, nova_ot + nova_otc, NULL, NULL FROM mfo
    UNION ALL SELECT user_id, 'Dec', h1,h3,h4, NULL, NULL, NULL, deca_ot + deca_otc, NULL, NULL FROM mfo

    -- DT
    UNION ALL SELECT user_id, 'Jan', h1,h3,h4, NULL, NULL, NULL, NULL, jan_dt + jan_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Feb', h1,h3,h4, NULL, NULL, NULL, NULL, feb_dt + feb_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Mar', h1,h3,h4, NULL, NULL, NULL, NULL, mar_dt + mar_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Apr', h1,h3,h4, NULL, NULL, NULL, NULL, apr_dt + apr_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'May', h1,h3,h4, NULL, NULL, NULL, NULL, may_dt + may_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jun', h1,h3,h4, NULL, NULL, NULL, NULL, jun_dt + jun_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Jul', h1,h3,h4, NULL, NULL, NULL, NULL, jul_dt + jul_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Aug', h1,h3,h4, NULL, NULL, NULL, NULL, aug_dt + aug_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Sep', h1,h3,h4, NULL, NULL, NULL, NULL, sep_dt + sep_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Oct', h1,h3,h4, NULL, NULL, NULL, NULL, oct_dt + oct_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Nov', h1,h3,h4, NULL, NULL, NULL, NULL, nov_dt + nov_dt, NULL FROM mfo
    UNION ALL SELECT user_id, 'Dec', h1,h3,h4, NULL, NULL, NULL, NULL, dec_dt + dec_dt, NULL FROM mfo

    -- DA
    UNION ALL SELECT user_id, 'Jan', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, jana_dt + jana_dtc FROM mfo
    UNION ALL SELECT user_id, 'Feb', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, feba_dt + feba_dtc FROM mfo
    UNION ALL SELECT user_id, 'Mar', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, mara_dt + mara_dtc FROM mfo
    UNION ALL SELECT user_id, 'Apr', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, apra_dt + apra_dtc FROM mfo
    UNION ALL SELECT user_id, 'May', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, maya_dt + maya_dtc FROM mfo
    UNION ALL SELECT user_id, 'Jun', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, juna_dt + juna_dtc FROM mfo
    UNION ALL SELECT user_id, 'Jul', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, jula_dt + jula_dtc FROM mfo
    UNION ALL SELECT user_id, 'Aug', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, auga_dt + auga_dtc FROM mfo
    UNION ALL SELECT user_id, 'Sep', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, sepa_dt + sepa_dtc FROM mfo
    UNION ALL SELECT user_id, 'Oct', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, octa_dt + octa_dtc FROM mfo
    UNION ALL SELECT user_id, 'Nov', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, nova_dt + nova_dtc FROM mfo
    UNION ALL SELECT user_id, 'Dec', h1,h3,h4, NULL, NULL, NULL, NULL, NULL, deca_dt + deca_dtc FROM mfo
) AS res
INNER JOIN users AS u ON u.user_id = res.user_id
WHERE u.type != 6 AND res.h1 IS NOT NULL AND res.h1 <> '' 
GROUP BY res.month, res.h1
ORDER BY 
  FIELD(res.month, 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'),
  res.h1;
  `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}