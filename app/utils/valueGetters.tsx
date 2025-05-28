"use client";
import type { ValueFormatterParams } from "ag-grid-community";

import { ColDef, ExcelStyle } from "ag-grid-community";
import React, { useMemo } from "react";

//// BY DISTRICT
export function total_byDistrict(params: any) {
  if (!params.node.group) {
    return create_total(
      params.data.jan,
      params.data.feb,
      params.data.mar,
      params.data.apr,
      params.data.may,
      params.data.jun,
      params.data.jul,
      params.data.aug,
      params.data.sep,
      params.data.oct,
      params.data.nov,
      params.data.dece
    );
  }
}

export function percentage_byDistrict(params: any) {
  if (!params.node.group) {
    return create_percentage(
      params.getValue("grandtotal_district"),
      params.data.target
    );
  }
}

//// FINANCIAL OBLIGATION

export function total_janft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jan_ot, params.data.jan_otc);
  }
}

export function total_febft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.feb_ot, params.data.feb_otc);
  }
}

export function total_marft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.mar_ot, params.data.mar_otc);
  }
}

export function total_aprft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.apr_ot, params.data.apr_otc);
  }
}

export function total_mayft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.may_ot, params.data.may_otc);
  }
}

export function total_junft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jun_ot, params.data.jun_otc);
  }
}

export function total_julft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jul_ot, params.data.jul_otc);
  }
}

export function total_augft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.aug_ot, params.data.aug_otc);
  }
}

export function total_sepft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.sep_ot, params.data.sep_otc);
  }
}

export function total_octft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.oct_ot, params.data.oct_otc);
  }
}

export function total_novft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.nov_ot, params.data.nov_otc);
  }
}

export function total_decft(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.dec_ot, params.data.dec_otc);
  }
}

export function total_q1_mooe_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jan_ot,
      params.data.feb_ot,
      params.data.mar_ot
    );
  }
}

export function total_q1_co_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jan_otc,
      params.data.feb_otc,
      params.data.mar_otc
    );
  }
}

export function total_q2_mooe_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apr_ot,
      params.data.may_ot,
      params.data.jun_ot
    );
  }
}

export function total_q2_co_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apr_otc,
      params.data.may_otc,
      params.data.jun_otc
    );
  }
}

export function total_q3_mooe_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jul_ot,
      params.data.aug_ot,
      params.data.sep_ot
    );
  }
}

export function total_q3_co_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jul_otc,
      params.data.aug_otc,
      params.data.sep_otc
    );
  }
}

export function total_q4_mooe_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.oct_ot,
      params.data.nov_ot,
      params.data.dec_ot
    );
  }
}

export function total_q4_co_ft(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.oct_otc,
      params.data.nov_otc,
      params.data.dec_otc
    );
  }
}

export function total_q1(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("jan_tot"),
      params.getValue("feb_tot"),
      params.getValue("mar_tot")
    );
  }
}

export function total_q2(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("apr_tot"),
      params.getValue("may_tot"),
      params.getValue("jun_tot")
    );
  }
}

export function total_q3(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("jul_tot"),
      params.getValue("aug_tot"),
      params.getValue("sep_tot")
    );
  }
}
export function total_q4(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("oct_tot"),
      params.getValue("nov_tot"),
      params.getValue("dec_tot")
    );
  }
}

export function total_mooe_ft(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1ft"),
      params.getValue("q2ft"),
      params.getValue("q3ft"),
      params.getValue("q4ft")
    );
  }
}

export function total_co_ft(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1ft_co"),
      params.getValue("q2ft_co"),
      params.getValue("q3ft_co"),
      params.getValue("q4ft_co")
    );
  }
}

export function grandtotal_ft(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1_tot"),
      params.getValue("q2_tot"),
      params.getValue("q3_tot"),
      params.getValue("q4_tot")
    );
  }
}

export function create_totalAB(a: number, b: number) {
  return {
    a: a,
    b: b,
    toString: function () {
      return a + b;
    },
  };
}

export function create_totalABC(a: number, b: number, c: number) {
  return {
    a: a,
    b: b,
    c: c,
    toString: function () {
      return a + b + c;
    },
  };
}

export function create_totalABCD(a: number, b: number, c: number, d: number) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    toString: function () {
      return a + b + c + d;
    },
  };
}

export function create_totalABCDE(a: any, b: any, c: any, d: any, e: any) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    toString: function () {
      return a + b + c + d + e;
    },
  };
}

export function create_total(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  g: number,
  h: number,
  i: number,
  j: number,
  k: number,
  l: number
) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    f: f,
    g: g,
    h: h,
    i: i,
    j: j,
    k: k,
    l: l,
    toString: function () {
      return a + b + c + d + e + f + g + h + i + j + k + l;
    },
  };
}

export function create_total2(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  g: number,
  h: number,
  i: number,
  j: number,
  k: number,
  l: number,
  m: number
) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    f: f,
    g: g,
    h: h,
    i: i,
    j: j,
    k: k,
    l: l,
    m: m,
    toString: function () {
      return a + b + c + d + e + f + g + h + i + j + k + l + m;
    },
  };
}

export function TotalQuarterAggFunc(params: any) {
  var aSum = 0,
    bSum = 0,
    cSum = 0;
  params.values.forEach(function (value: { a: number; b: number; c: number }) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
    if (value && value.c) {
      cSum += value.c;
    }
  });
  return create_totalABC(aSum, bSum, cSum);
}

export function TotalMonthAggFunc(params: any) {
  var aSum = 0,
    bSum = 0;
  params.values.forEach(function (value: { a: number; b: number }) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
  });
  return create_totalAB(aSum, bSum);
}

export function TotalYearAggFunc(params: any) {
  var [a, b, c, d, e, f, g, h, i, j, k, l] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  params.values.forEach(function (value: {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    j: number;
    k: number;
    l: number;
  }) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
    if (value && value.c) {
      c += value.c;
    }
    if (value && value.d) {
      d += value.d;
    }
    if (value && value.e) {
      e += value.e;
    }
    if (value && value.f) {
      f += value.f;
    }
    if (value && value.g) {
      g += value.g;
    }
    if (value && value.h) {
      h += value.h;
    }
    if (value && value.i) {
      i += value.i;
    }
    if (value && value.j) {
      j += value.j;
    }
    if (value && value.k) {
      k += value.k;
    }
    if (value && value.l) {
      l += value.l;
    }
  });
  return create_total(a, b, c, d, e, f, g, h, i, j, k, l);
}

export function TotalYearAggFunc2(params: any) {
  var [a, b, c, d, e, f, g, h, i, j, k, l, m] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  params.values.forEach(function (value: {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    j: number;
    k: number;
    l: number;
    m: number;
  }) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
    if (value && value.c) {
      c += value.c;
    }
    if (value && value.d) {
      d += value.d;
    }
    if (value && value.e) {
      e += value.e;
    }
    if (value && value.f) {
      f += value.f;
    }
    if (value && value.g) {
      g += value.g;
    }
    if (value && value.h) {
      h += value.h;
    }
    if (value && value.i) {
      i += value.i;
    }
    if (value && value.j) {
      j += value.j;
    }
    if (value && value.k) {
      k += value.k;
    }
    if (value && value.l) {
      l += value.l;
    }
    if (value && value.m) {
      m += value.m;
    }
  });
  return create_total2(a, b, c, d, e, f, g, h, i, j, k, l, m);
}

export function GrandTotalAggFunc(params: any) {
  var [a, b, c, d] = [0, 0, 0, 0];
  params.values.forEach(function (value: {
    a: number;
    b: number;
    c: number;
    d: number;
  }) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
    if (value && value.c) {
      c += value.c;
    }
    if (value && value.d) {
      d += value.d;
    }
  });
  return create_totalABCD(a, b, c, d);
}

// Obligations.............
//////////////////////////

export function total_janfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jana_ot, params.data.jana_otc);
  }
}

export function total_febfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.feba_ot, params.data.feba_otc);
  }
}

export function total_marfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.mara_ot, params.data.mara_otc);
  }
}

export function total_aprfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.apra_ot, params.data.apra_otc);
  }
}

export function total_mayfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.maya_ot, params.data.maya_otc);
  }
}

export function total_junfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.juna_ot, params.data.juna_otc);
  }
}

export function total_julfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jula_ot, params.data.jula_otc);
  }
}

export function total_augfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.auga_ot, params.data.auga_otc);
  }
}

export function total_sepfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.sepa_ot, params.data.sepa_otc);
  }
}

export function total_octfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.octa_ot, params.data.octa_otc);
  }
}

export function total_novfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.nova_ot, params.data.nova_otc);
  }
}

export function total_decfa(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.deca_ot, params.data.deca_otc);
  }
}

export function total_mooe_fa(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1fa"),
      params.getValue("q2fa"),
      params.getValue("q3fa"),
      params.getValue("q4fa")
    );
  }
}

export function total_co_fa(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1fa_co"),
      params.getValue("q2fa_co"),
      params.getValue("q3fa_co"),
      params.getValue("q4fa_co")
    );
  }
}
export function grandtotal_fa(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1_tota"),
      params.getValue("q2_tota"),
      params.getValue("q3_tota"),
      params.getValue("q4_tota")
    );
  }
}

export function total_q1_mooe_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jana_ot,
      params.data.feba_ot,
      params.data.mara_ot
    );
  }
}

export function total_q1_co_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jana_otc,
      params.data.feba_otc,
      params.data.mara_otc
    );
  }
}

export function total_q2_mooe_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apra_ot,
      params.data.maya_ot,
      params.data.juna_ot
    );
  }
}

export function total_q2_co_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apra_otc,
      params.data.maya_otc,
      params.data.juna_otc
    );
  }
}

export function total_q3_mooe_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jula_ot,
      params.data.auga_ot,
      params.data.sepa_ot
    );
  }
}

export function total_q3_co_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jula_otc,
      params.data.auga_otc,
      params.data.sepa_otc
    );
  }
}

export function total_q4_mooe_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octa_ot,
      params.data.nova_ot,
      params.data.deca_ot
    );
  }
}

export function total_q4_co_fa(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octa_otc,
      params.data.nova_otc,
      params.data.deca_otc
    );
  }
}

export function total_fa_q1(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("jan_tota"),
      params.getValue("feb_tota"),
      params.getValue("mar_tota")
    );
  }
}

export function total_fa_q2(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("apr_tota"),
      params.getValue("may_tota"),
      params.getValue("jun_tota")
    );
  }
}

export function total_fa_q3(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("jul_tota"),
      params.getValue("aug_tota"),
      params.getValue("sep_tota")
    );
  }
}
export function total_fa_q4(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("oct_tota"),
      params.getValue("nov_tota"),
      params.getValue("dec_tota")
    );
  }
}

export function total_adj(params: any) {
  if (!params.node.group) {
    return create_totalAB(
      params.getValue("adj_mooe"),
      params.getValue("adj_co")
    );
  }
}

export function tot_adj_mooe(params: any) {
  if (!params.node.group) {
    return create_totalAB(
      params.getValue("total_ft"),
      params.getValue("adj_mooe")
    );
  }
}

export function tot_adj_co(params: any) {
  if (!params.node.group) {
    return create_totalAB(
      params.getValue("total_ft_co"),
      params.getValue("adj_co")
    );
  }
}

export function adj_allot_total(params: any) {
  if (!params.node.group) {
    return create_totalAB(
      params.getValue("tot_adj_mooe"),
      params.getValue("tot_adj_co")
    );
  }
}

export function unobligated(params: any) {
  if (!params.node.group) {
    return create_totalAMinusB(
      params.getValue("grandtotal_ft"),
      params.getValue("grandtotal_fa")
    );
  }
}

export function percentage(params: any) {
  if (!params.node.group) {
    return create_percentage(
      params.getValue("grandtotal_fa"),
      params.getValue("grandtotal_ft")
    );
  }
}

export function create_totalAMinusB(a: number, b: number) {
  return {
    a: a,
    b: b,
    toString: function () {
      return a - b;
    },
  };
}

export function create_percentage(a: number, b: number) {
  return {
    a: a,
    b: b,
    toString: function () {
      return a && b ? (a / b) * 100 : 0;
    },
  };
}

export function TotalUnobligatedAggFunc(params: any) {
  var aSum = 0,
    bSum = 0;
  params.values.forEach(function (value: { a: number; b: number }) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
  });
  return create_totalAMinusB(aSum, bSum);
}

export function TotalpercentAggFunc(params: any) {
  var aSum = 0,
    bSum = 0;
  params.values.forEach(function (value: { a: number; b: number }) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
  });
  return create_percentage(aSum, bSum);
}

//////////PHYSICAL

export function Q1_Physical(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(params.data.jan_pt);
    } else {
      return create_totalABC(
        params.data.jan_pt,
        params.data.feb_pt,
        params.data.mar_pt
      );
    }
  }
}

export function Q2_Physical(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(params.data.jan_pt);
    } else {
      return create_totalABC(
        params.data.apr_pt,
        params.data.may_pt,
        params.data.jun_pt
      );
    }
  }
}

export function Q3_Physical(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(params.data.jan_pt);
    } else {
      return create_totalABC(
        params.data.jul_pt,
        params.data.aug_pt,
        params.data.sep_pt
      );
    }
  }
}

export function Q4_Physical(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(params.data.jan_pt);
    } else {
      return create_totalABC(
        params.data.oct_pt,
        params.data.nov_pt,
        params.data.dec_pt
      );
    }
  }
}

export function GrandTotal_Physical(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(params.data.jan_pt);
    } else {
      return create_totalABCD(
        params.getValue("Q1_pt"),
        params.getValue("Q2_pt"),
        params.getValue("Q3_pt"),
        params.getValue("Q4_pt")
      );
    }
  }
}

export function Q1_PhysicalA(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(
        (params.data.jan_pa + params.data.feb_pa + params.data.mar_pa) / 3
      );
    } else {
      return create_totalABC(
        params.data.jan_pa,
        params.data.feb_pa,
        params.data.mar_pa
      );
    }
  }
}

export function Q2_PhysicalA(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(
        (params.data.apr_pa + params.data.may_pa + params.data.jun_pa) / 3
      );
    } else {
      return create_totalABC(
        params.data.apr_pa,
        params.data.may_pa,
        params.data.jun_pa
      );
    }
  }
}

export function Q3_PhysicalA(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(
        (params.data.jul_pa + params.data.aug_pa + params.data.sep_pa) / 3
      );
    } else {
      return create_totalABC(
        params.data.jul_pa,
        params.data.aug_pa,
        params.data.sep_pa
      );
    }
  }
}

export function Q4_PhysicalA(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(
        (params.data.oct_pa + params.data.nov_pa + params.data.dec_pa) / 3
      );
    } else {
      return create_totalABC(
        params.data.oct_pa,
        params.data.nov_pa,
        params.data.dec_pa
      );
    }
  }
}

export function GrandTotal_PhysicalA(params: any) {
  if (!params.node.group) {
    if (params.data.main) {
      return -Math.abs(
        (params.getValue("Q1_pa") +
          params.getValue("Q2_pa") +
          params.getValue("Q3_pa") +
          params.getValue("Q4_pa")) /
          4
      );
    } else {
      return create_totalABCD(
        params.getValue("Q1_pa"),
        params.getValue("Q2_pa"),
        params.getValue("Q3_pa"),
        params.getValue("Q4_pa")
      );
    }
  }
}

export function variance(params: any) {
  if (!params.node.group) {
    return create_totalAMinusB(params.getValue("PT"), params.getValue("PA"));
  }
}

export function percentage_physical(params: any) {
  if (!params.node.group) {
    return create_percentage(params.getValue("PA"), params.getValue("PT"));
  }
}

//////DISBURSEMENT

export function total_jandt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jan_dt, params.data.jan_dtc);
  }
}

export function total_febdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.feb_dt, params.data.feb_dtc);
  }
}

export function total_mardt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.mar_dt, params.data.mar_dtc);
  }
}

export function total_aprdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.apr_dt, params.data.apr_dtc);
  }
}

export function total_maydt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.may_dt, params.data.may_dtc);
  }
}

export function total_jundt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jun_dt, params.data.jun_dtc);
  }
}

export function total_juldt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jul_dt, params.data.jul_dtc);
  }
}

export function total_augdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.aug_dt, params.data.aug_dtc);
  }
}

export function total_sepdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.sep_dt, params.data.sep_dtc);
  }
}

export function total_octdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.oct_dt, params.data.oct_dtc);
  }
}

export function total_novdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.nov_dt, params.data.nov_dtc);
  }
}

export function total_decdt(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.dec_dt, params.data.dec_dtc);
  }
}

export function total_q1_2023(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.dt_q1, params.data.dt_q1_co);
  }
}

export function total_q1_mooe_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jan_dt,
      params.data.feb_dt,
      params.data.mar_dt
    );
  }
}

export function total_q1_co_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jan_dtc,
      params.data.feb_dtc,
      params.data.mar_dtc
    );
  }
}

export function total_q2_mooe_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apr_dt,
      params.data.may_dt,
      params.data.jun_dt
    );
  }
}

export function total_q2_co_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apr_dtc,
      params.data.may_dtc,
      params.data.jun_dtc
    );
  }
}

export function total_q3_mooe_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jul_dt,
      params.data.aug_dt,
      params.data.sep_dt
    );
  }
}

export function total_q3_co_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jul_dtc,
      params.data.aug_dtc,
      params.data.sep_dtc
    );
  }
}

export function total_q4_mooe_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.oct_dt,
      params.data.nov_dt,
      params.data.dec_dt
    );
  }
}

export function total_q4_co_dt(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.oct_dtc,
      params.data.nov_dtc,
      params.data.dec_dtc
    );
  }
}

export function totaldt_q1(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("jandt_tot"),
      params.getValue("febdt_tot"),
      params.getValue("mardt_tot")
    );
  }
}

export function totaldt_q2(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("aprdt_tot"),
      params.getValue("maydt_tot"),
      params.getValue("jundt_tot")
    );
  }
}

export function totaldt_q3(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("juldt_tot"),
      params.getValue("augdt_tot"),
      params.getValue("sepdt_tot")
    );
  }
}
export function totaldt_q4(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("octdt_tot"),
      params.getValue("novdt_tot"),
      params.getValue("decdt_tot")
    );
  }
}

export function total_mooe_dt(params: any) {
  if (!params.node.group) {
    return create_totalABCDE(
      params.getValue("q1dt"),
      params.getValue("q2dt"),
      params.getValue("q3dt"),
      params.getValue("q4dt"),
      params.getValue("dt_q1")
    );
  }
}

export function total_co_dt(params: any) {
  if (!params.node.group) {
    return create_totalABCDE(
      params.getValue("q1dt_co"),
      params.getValue("q2dt_co"),
      params.getValue("q3dt_co"),
      params.getValue("q4dt_co"),
      params.getValue("dt_q1_co")
    );
  }
}
export function grandtotal_dt(params: any) {
  if (!params.node.group) {
    return create_totalABCDE(
      params.getValue("q1dt_tot"),
      params.getValue("q2dt_tot"),
      params.getValue("q3dt_tot"),
      params.getValue("q4dt_tot"),
      params.getValue("dtq1_total")
    );
  }
}

export function total_janda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jana_dt, params.data.jana_dtc);
  }
}

export function total_febda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.feba_dt, params.data.feba_dtc);
  }
}

export function total_marda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.mara_dt, params.data.mara_dtc);
  }
}

export function total_aprda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.apra_dt, params.data.apra_dtc);
  }
}

export function total_mayda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.maya_dt, params.data.maya_dtc);
  }
}

export function total_junda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.juna_dt, params.data.juna_dtc);
  }
}

export function total_julda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.jula_dt, params.data.jula_dtc);
  }
}

export function total_augda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.auga_dt, params.data.auga_dtc);
  }
}

export function total_sepda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.sepa_dt, params.data.sepa_dtc);
  }
}

export function total_octda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.octa_dt, params.data.octa_dtc);
  }
}

export function total_novda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.nova_dt, params.data.nova_dtc);
  }
}

export function total_decda(params: any) {
  if (!params.node.group) {
    return create_totalAB(params.data.deca_dt, params.data.deca_dtc);
  }
}

export function total_mooe_da(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1da"),
      params.getValue("q2da"),
      params.getValue("q3da"),
      params.getValue("q4da")
    );
  }
}

export function total_co_da(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1da_co"),
      params.getValue("q2da_co"),
      params.getValue("q3da_co"),
      params.getValue("q4da_co")
    );
  }
}
export function grandtotal_da(params: any) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue("q1da_tota"),
      params.getValue("q2da_tota"),
      params.getValue("q3da_tota"),
      params.getValue("q4da_tota")
    );
  }
}

export function total_q1_mooe_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jana_dt,
      params.data.feba_dt,
      params.data.mara_dt
    );
  }
}

export function total_q1_co_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jana_dtc,
      params.data.feba_dtc,
      params.data.mara_dtc
    );
  }
}

export function total_q2_mooe_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apra_dt,
      params.data.maya_dt,
      params.data.juna_dt
    );
  }
}

export function total_q2_co_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.apra_dtc,
      params.data.maya_dtc,
      params.data.juna_dtc
    );
  }
}

export function total_q3_mooe_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jula_dt,
      params.data.auga_dt,
      params.data.sepa_dt
    );
  }
}

export function total_q3_co_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jula_dtc,
      params.data.auga_dtc,
      params.data.sepa_dtc
    );
  }
}

export function total_q4_mooe_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octa_dt,
      params.data.nova_dt,
      params.data.deca_dt
    );
  }
}

export function total_q4_co_da(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octa_dtc,
      params.data.nova_dtc,
      params.data.deca_dtc
    );
  }
}

export function total_da_q1(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("janda_tota"),
      params.getValue("febda_tota"),
      params.getValue("marda_tota")
    );
  }
}

export function total_da_q2(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("aprda_tota"),
      params.getValue("mayda_tota"),
      params.getValue("junda_tota")
    );
  }
}

export function total_da_q3(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("julda_tota"),
      params.getValue("augda_tota"),
      params.getValue("sepda_tota")
    );
  }
}
export function total_da_q4(params: any) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue("octda_tota"),
      params.getValue("novda_tota"),
      params.getValue("decda_tota")
    );
  }
}

export function unpaidObligations(params: any) {
  if (!params.node.group) {
    return create_totalAMinusB(
      params.getValue("grandtotal_fa"),
      params.getValue("grandtotal_da")
    );
  }
}

export function disbursementPercentage(params: any) {
  if (!params.node.group) {
    return create_percentage(
      params.getValue("grandtotal_da"),
      params.getValue("grandtotal_fa")
    );
  }
}

export function adjusted_disbursement_view(params: any) {
  if (!params.node.group) {
    let d = params.data;
    let a =
      d.janft +
      d.janft_co +
      d.febft +
      d.febft_co +
      d.marft +
      d.marft_co +
      d.aprft +
      d.aprft_co +
      d.mayft +
      d.mayft_co +
      d.junft +
      d.junft_co +
      d.julft +
      d.julft_co +
      d.augft +
      d.augft_co +
      d.sepft +
      d.sepft_co +
      d.octft +
      d.octft_co +
      d.novft +
      d.novft_co +
      d.decft +
      d.decft_co;
    let b = d.adjustment + d.adjustment_co;
    return create_totalAB(a, b);
  }
}

///////// EXCEL STYLES

export const excelStyles: ExcelStyle[] = [
  { id: "indent1", alignment: { indent: 1 }, dataType: "String" },
  { id: "indent2", alignment: { indent: 2 }, dataType: "String" },
  { id: "indent3", alignment: { indent: 3 }, dataType: "String" },
  { id: "indent4", alignment: { indent: 4 }, dataType: "String" },
  { id: "indent5", alignment: { indent: 5 }, dataType: "String" },
  { id: "bold", font: { bold: true } },
  {
    id: "data",
    font: { size: 11, fontName: "Calibri" },
    numberFormat: { format: "#,##0.00" },
    borders: {
      borderBottom: {
        color: "#000000",
        lineStyle: "Continuous",
        weight: 1,
      },
      borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
    },
  },
  {
    id: "t",
    interior: { color: "#fae091", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    alignment: { horizontal: "Center" },
  },
  {
    id: "a",
    interior: { color: "#a2dde5", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    alignment: { horizontal: "Center" },
  },
  {
    id: "v",
    interior: { color: "#ec9fa7", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    alignment: { horizontal: "Center" },
  },
  {
    id: "month",
    interior: { color: "#e6f403", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    alignment: { horizontal: "Center" },
    numberFormat: { format: "#,##0.00" },
    borders: {
      borderBottom: {
        color: "#000000",
        lineStyle: "Continuous",
        weight: 1,
      },
      borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
    },
  },
  {
    id: "quarter",
    interior: { color: "#edbae5", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    numberFormat: { format: "#,##0.00" },
    alignment: { horizontal: "Center" },
    borders: {
      borderBottom: {
        color: "#000000",
        lineStyle: "Continuous",
        weight: 1,
      },
      borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
    },
  },
  {
    id: "p1",
    interior: { color: "#7a6f67", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    alignment: { horizontal: "Center" },
  },
  {
    id: "total",
    interior: { color: "#81f7a6", pattern: "Solid" },
    font: { size: 11, fontName: "Calibri", bold: true },
    numberFormat: { format: "#,##0.00" },
    alignment: { horizontal: "Center" },
    borders: {
      borderBottom: {
        color: "#000000",
        lineStyle: "Continuous",
        weight: 1,
      },
      borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
    },
  },

  {
    id: "header",
    font: { size: 11, fontName: "Calibri", bold: true },
    borders: {
      borderBottom: {
        color: "#000000",
        lineStyle: "Continuous",
        weight: 1,
      },
      borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
      borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
    },
  },
  { id: "headappend", font: { size: 11, fontName: "Calibri", bold: true } },
];

export function customStyleGroup(params: any) {
  if (params.node.group) {
    return { textAlign: "right", fontWeight: "bold" };
  } else {
    return { textAlign: "right", fontWeight: "normal" };
  }
}

export function customStyleGroupQuarter(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#a2dde5",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#a2dde5",
      fontWeight: "normal",
    };
  }
}

export function customStyleGroupTotal(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#F5f5dc",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#F5f5dc",
      fontWeight: "normal",
    };
  }
}

export function customStyleGroupQaurter2(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#fae091",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#fae091",
      fontWeight: "normal",
    };
  }
}

export function customStyleGroupQaurter3(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#e8eb34",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#e8eb34",
      fontWeight: "normal",
    };
  }
}

export function customStyleGroupDisburse(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#ffaff8",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#ffaff8",
      fontWeight: "normal",
    };
  }
}

export function customStyleGroupDisburse2(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#ADD8E6",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "#ADD8E6",
      fontWeight: "normal",
    };
  }
}

export function customStyleGroupPhysical(params: any) {
  if (params.node.group) {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "orange",
      fontWeight: "bold",
    };
  } else {
    return {
      textAlign: "right",
      color: "black",
      backgroundColor: "orange",
      fontWeight: "normal",
    };
  }
}

export function currencyFormatter(params: {
  value: number | null | undefined;
}) {
  const number = Math.abs(params.value!);
  if (params.value === undefined || params.value === null) {
    return "";
  }
  var returnString = Number(number).toLocaleString("en-us", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return params.value < 0 ? "(" + returnString + ")" : returnString;
}

export function SimpleCellRenderer(props: {
  node: { group: any };
  data: { area: number; main: number; flagged: number };
  value:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | React.ReactPortal
        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
}) {
  if (!props.node.group && props.data.area == 1) {
    return <span className="bg-yellow-300"> {props.value} </span>;
  } else if (!props.node.group && props.data.main == 1) {
    return <span className="bg-cyan-300"> {props.value} </span>;
  } else if (!props.node.group && props.data.flagged == 1) {
    return <span className="bg-red-800 text-white"> {props.value} </span>;
  } else {
    return <span> {props.value} </span>;
  }
}

export function autoGroupColumnDef() {
  const autoGroupColumnDef: ColDef = useMemo(() => {
    return {
      headerName: "MFOs/PAPs",
      pinned: "left",
      width: 350,
      resizable: true,
      field: "name",
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: SimpleCellRenderer,
        //checkbox: false,
      },
      cellClass: ["data"],
      cellClassRules: { bold: (params) => (params.node.group ? true : false) },
    };
  }, []);
  return autoGroupColumnDef;
}
