import { db } from "../../../db";

export  async function GET(){
  try {
    const result = await db.$queryRaw`
    WITH PMIS AS (
      SELECT
      h1, 
      mfo_id,
      h4,
      name,
      
      -- Accumulated Physical Target (PT)
      SUM(jan_pt) AS JAN,
      SUM(jan_pt + feb_pt) AS FEB,
      SUM(jan_pt + feb_pt + mar_pt) AS MAR,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt) AS APR,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt) AS MAY,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt) AS JUN,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt + jul_pt) AS JUL,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt + jul_pt + aug_pt) AS AUG,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt + jul_pt + aug_pt + sep_pt) AS SEP,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt + jul_pt + aug_pt + sep_pt + oct_pt) AS OCTO,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt + jul_pt + aug_pt + sep_pt + oct_pt + nov_pt) AS NOV,
      SUM(jan_pt + feb_pt + mar_pt + apr_pt + may_pt + jun_pt + jul_pt + aug_pt + sep_pt + oct_pt + nov_pt + dec_pt) AS DECE,
      
      -- Accummulated Physical Accomplishment (PA)
      SUM(jan_pa) AS JANA,
      SUM(jan_pa + feb_pa) AS FEBA,
      SUM(jan_pa + feb_pa + mar_pa) AS MARA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa ) AS APRA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa) AS MAYA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa) AS JUNA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa) AS JULA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa + aug_pa) AS AUGA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa + aug_pa + sep_pa) AS SEPA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa + aug_pa + sep_pa + oct_pa) AS OCTOA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa + aug_pa + sep_pa + oct_pa + nov_pa) AS NOVA,
      SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa + aug_pa + sep_pa + oct_pa + nov_pa + dec_pa) AS DECEA
      
    FROM mfo AS m
    INNER JOIN users AS u ON u.user_id = m.user_id
    WHERE u.type <> 6
    GROUP BY m.mfo_id
    )

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '01/01/2025' AS month,
      JAN AS TARGET, 						-- accumulated target
      JANA AS ACCOMPLISHMENT,			-- accumulated accomplishment
      LEAST(JAN, JANA) AS capped 	-- capped
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '02/01/2025',
      FEB,
      FEBA,
      LEAST(FEB, FEBA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '03/01/2025',
      MAR,
      MARA,
      LEAST(MAR, MARA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '04/01/2025',
      APR,
      APRA,
      LEAST(APR, APRA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '05/01/2025',
      MAY,
      MAYA,
      LEAST(MAY, MAYA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '06/01/2025',
      JUN,
      JUNA,
      LEAST(JUN, JUNA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '07/01/2025',
      JUL,
      JULA,
      LEAST(JUL, JULA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '08/01/2025',
      AUG,
      AUGA,
      LEAST(AUG, AUGA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '09/01/2025',
      SEP,
      SEPA,
      LEAST(SEP, SEPA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '10/01/2025',
      OCTO,
      OCTOA,
      LEAST(OCTO, OCTOA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '11/01/2025',
      NOV,
      NOVA,
      LEAST(NOV, NOVA)
    FROM PMIS

    UNION ALL

    SELECT 
      h1,
      mfo_id,
      h4,
      name,
      '12/01/2025',
      DECE,
      DECEA,
      LEAST(DECE, DECEA)
    FROM PMIS

    ORDER BY h4 ASC, FIELD(MONTH, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
      
   `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}