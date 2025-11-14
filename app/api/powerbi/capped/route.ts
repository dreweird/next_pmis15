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
        SUM(jan_pa + feb_pa + mar_pa + apr_pa + may_pa + jun_pa + jul_pa + aug_pa + sep_pa + oct_pa + nov_pa + dec_pa) AS DECEA,
      
        -- Obligation Targtet
        SUM(jan_ot + jan_otc) AS JANOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc) AS FEBOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc) AS MAROT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc) AS APROT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc) AS MAYOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc) AS JUNOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc + jul_ot + jul_otc) AS JULOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc + jul_ot + jul_otc + aug_ot + aug_otc) AS AUGOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc + jul_ot + jul_otc + aug_ot + aug_otc + sep_ot + sep_otc) AS SEPOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc + jul_ot + jul_otc + aug_ot + aug_otc + sep_ot + sep_otc + oct_ot + oct_otc) AS OCTOOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc + jul_ot + jul_otc + aug_ot + aug_otc + sep_ot + sep_otc + oct_ot + oct_otc + nov_ot + nov_otc) AS NOVOT,
        SUM(jan_ot + jan_otc + feb_ot + feb_otc + mar_ot + mar_otc + apr_ot + apr_otc + may_ot + may_otc + jun_ot + jun_otc + jul_ot + jul_otc + aug_ot + aug_otc + sep_ot + sep_otc + oct_ot + oct_otc + nov_ot + nov_otc + dec_ot + dec_otc) AS DECOT,
        

        -- Accummulated Obligation Accomplishment
        SUM(jana_ot + jana_otc) AS JANA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc) AS FEBA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc) AS MARA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc) AS APRA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc) AS MAYA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc) AS JUNA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc + jula_ot + jula_otc) AS JULA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc + jula_ot + jula_otc + auga_ot + auga_otc) AS AUGA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc + jula_ot + jula_otc + auga_ot + auga_otc + sepa_ot + sepa_otc) AS SEPA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc + jula_ot + jula_otc + auga_ot + auga_otc + sepa_ot + sepa_otc + octa_ot + octa_otc) AS OCTOA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc + jula_ot + jula_otc + auga_ot + auga_otc + sepa_ot + sepa_otc + octa_ot + octa_otc + nova_ot + nova_otc) AS NOVA_OTC,
        SUM(jana_ot + jana_otc + feba_ot + feba_otc + mara_ot + mara_otc + apra_ot + apra_otc + maya_ot + maya_otc + juna_ot + juna_otc + jula_ot + jula_otc + auga_ot + auga_otc + sepa_ot + sepa_otc + octa_ot + octa_otc + nova_ot + nova_otc + deca_ot + deca_otc) AS DECEA_OTC,

        -- Accumulated Disbursement Target
        SUM(jan_dt + jan_dtc) AS JANDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc) AS FEBDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc) AS MARDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc) AS APRDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc) AS MAYDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc) AS JUNDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc + jul_dt + jul_dtc) AS JULDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc + jul_dt + jul_dtc + aug_dt + aug_dtc) AS AUGDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc + jul_dt + jul_dtc + aug_dt + aug_dtc + sep_dt + sep_dtc) AS SEPDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc + jul_dt + jul_dtc + aug_dt + aug_dtc + sep_dt + sep_dtc + oct_dt + oct_dtc) AS OCTODT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc + jul_dt + jul_dtc + aug_dt + aug_dtc + sep_dt + sep_dtc + oct_dt + oct_dtc + nov_dt + nov_dtc) AS NOVDT,
        SUM(jan_dt + jan_dtc + feb_dt + feb_dtc + mar_dt + mar_dtc + apr_dt + apr_dtc + may_dt + may_dtc + jun_dt + jun_dtc + jul_dt + jul_dtc + aug_dt + aug_dtc + sep_dt + sep_dtc + oct_dt + oct_dtc + nov_dt + nov_dtc + dec_dt + dec_dtc) AS DECDT,

        -- Accumulated Disbursement Accomplishment
        SUM(jana_dt + jana_dtc) AS JANA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc) AS FEBA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc) AS MARA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc) AS APRA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc) AS MAYA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc) AS JUNA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc + jula_dt + jula_dtc) AS JULA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc + jula_dt + jula_dtc + auga_dt + auga_dtc) AS AUGA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc + jula_dt + jula_dtc + auga_dt + auga_dtc + sepa_dt + sepa_dtc) AS SEPA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc + jula_dt + jula_dtc + auga_dt + auga_dtc + sepa_dt + sepa_dtc + octa_dt + octa_dtc) AS OCTOA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc + jula_dt + jula_dtc + auga_dt + auga_dtc + sepa_dt + sepa_dtc + octa_dt + octa_dtc + nova_dt + nova_dtc) AS NOVA_DT,
        SUM(jana_dt + jana_dtc + feba_dt + feba_dtc + mara_dt + mara_dtc + apra_dt + apra_dtc + maya_dt + maya_dtc + juna_dt + juna_dtc + jula_dt + jula_dtc + auga_dt + auga_dtc + sepa_dt + sepa_dtc + octa_dt + octa_dtc + nova_dt + nova_dtc + deca_dt + deca_dtc) AS DECEA_DT


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
        JAN AS TARGET, 						        -- accumulated target
        JANA AS ACCOMPLISHMENT,			            -- accumulated accomplishment
        JANOT AS OBLIGATION_TARGET,                 -- accumulated obligation target
        JANA_OTC AS OBLIGATION_ACCOMPLISHMENT,      -- accumulated obligation accomplishment
        JANDT AS DISBURSEMENT_TARGET,               -- accumulated disbursement target
        JANA_DT AS DISBURSEMENT_ACCOMPLISHMENT,     -- accumulated disbursement accomplishment
        LEAST(JAN, JANA) AS capped 	                -- capped
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
        FEBOT,
        FEBA_OTC,
        FEBDT,
        FEBA_DT,
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
        MAROT,
        MARA_OTC,
        MARDT,
        MARA_DT,
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
        APROT,
        APRA_OTC,
        APRDT,
        APRA_DT,
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
        MAYOT,
        MAYA_OTC,
        MAYDT,
        MAYA_DT,
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
        JUNOT,
        JUNA_OTC,
        JUNDT,
        JUNA_DT,
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
        JULOT,
        JULA_OTC,
        JULDT,
        JULA_DT,
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
        AUGOT,
        AUGA_OTC,
        AUGDT,
        AUGA_DT,
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
        SEPOT,
        SEPA_OTC,
        SEPDT,
        SEPA_DT,
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
        OCTOOT,
        OCTOA_OTC,
        OCTODT,
        OCTOA_DT,
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
        NOVOT,
        NOVA_OTC,
        NOVDT,
        NOVA_DT,
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
        DECOT,
        DECEA_OTC,
        DECDT,
        DECEA_DT,
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