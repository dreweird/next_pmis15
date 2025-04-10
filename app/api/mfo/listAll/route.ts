import { db } from "../../../db";

export  async function GET(){

  try {
    const result = await db.$queryRaw`
  SELECT a.user_id, u.office as name, u.type,
         
         sum(a.jan_ot + a.jan_otc) as janft,
         sum(a.feb_ot + a.feb_otc) as febft, 
         sum(a.mar_ot + a.mar_otc) as marft, 
         sum(a.apr_ot + a.apr_otc) as aprft, 
         sum(a.may_ot + a.may_otc) as mayft,
         sum(a.jun_ot + a.jun_otc) as junft,
         sum(a.jul_ot + a.jul_otc) as julft,
         sum(a.aug_ot + a.aug_otc) as augft,
         sum(a.sep_ot + a.sep_otc) as sepft,
         sum(a.oct_ot + a.oct_otc) as octft,
         sum(a.nov_ot + a.nov_otc) as novft,
         sum(a.dec_ot + a.dec_otc) as decft,
                   
         sum(a.jana_ot + a.jana_otc) as janfa,
         sum(a.feba_ot + a.feba_otc) as febfa, 
         sum(a.mara_ot + a.mara_otc) as marfa, 
         sum(a.apra_ot + a.apra_otc) as aprfa, 
         sum(a.maya_ot + a.maya_otc) as mayfa,
         sum(a.juna_ot + a.juna_otc) as junfa,
         sum(a.jula_ot + a.jula_otc) as julfa,
         sum(a.auga_ot + a.auga_otc) as augfa,
         sum(a.sepa_ot + a.sepa_otc) as sepfa,
         sum(a.octa_ot + a.octa_otc) as octfa,
         sum(a.nova_ot + a.nova_otc) as novfa,
         sum(a.deca_ot + a.deca_otc) as decfa,  
         
         sum(a.jan_dt + a.jan_dtc) as jandt,
         sum(a.feb_dt + a.feb_dtc) as febdt, 
         sum(a.mar_dt + a.mar_dtc) as mardt, 
         sum(a.apr_dt + a.apr_dtc) as aprdt, 
         sum(a.may_dt + a.may_dtc) as maydt,
         sum(a.jun_dt + a.jun_dtc) as jundt,
         sum(a.jul_dt + a.jul_dtc) as juldt,
         sum(a.aug_dt + a.aug_dtc) as augdt,
         sum(a.sep_dt + a.sep_dtc) as sepdt,
         sum(a.oct_dt + a.oct_dtc) as octdt,
         sum(a.nov_dt + a.nov_dtc) as novdt,
         sum(a.dec_dt + a.dec_dt) as decdt,
     
         
         
         sum(a.jana_dt + a.jana_dtc) as janda,
         sum(a.feba_dt + a.feba_dtc) as febda, 
         sum(a.mara_dt + a.mara_dtc) as marda, 
         sum(a.apra_dt + a.apra_dtc) as aprda, 
         sum(a.maya_dt + a.maya_dtc) as mayda,
         sum(a.juna_dt + a.juna_dtc) as junda,
         sum(a.jula_dt + a.jula_dtc) as julda,
         sum(a.auga_dt + a.auga_dtc) as augda,
         sum(a.sepa_dt + a.sepa_dtc) as sepda,
         sum(a.octa_dt + a.octa_dtc) as octda,
         sum(a.nova_dt + a.nova_dtc) as novda,
         sum(a.deca_dt + a.deca_dtc) as decda,
     
         SUM(jan_pt) AS jant, 
         SUM(jan_pa) AS jana,
         SUM(feb_pt) as febt,
         SUM(feb_pa) AS feba,
         SUM(mar_pt) as mart,
         SUM(mar_pa) AS mara,
         SUM(apr_pt) as aprt,
         SUM(apr_pa) AS apra,
         SUM(may_pt) as mayt,
         SUM(may_pa) AS maya,
         SUM(jun_pt) as junt,
         SUM(jun_pa) AS juna,
         SUM(jul_pt) as jult,
         SUM(jul_pa) AS jula,
         SUM(aug_pt) as augt,
         SUM(aug_pa) AS auga,
         SUM(sep_pt) as sept,
         SUM(sep_pa) AS sepa,
         SUM(oct_pt) as octt,
         SUM(oct_pa) AS octa,
         SUM(nov_pt) as novt,
         SUM(nov_pa) AS nova,
         SUM(dec_pt) as dect,
         SUM(dec_pa) AS deca
       
     
         FROM  mfo AS a left join users as u on  a.user_id = u.user_id
     where u.budget = 0 and u.type <> 6
         GROUP BY a.user_id ORDER BY a.user_id;
     `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}