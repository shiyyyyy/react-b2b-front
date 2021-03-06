import {queryEnum} from '@/utils/utils';

function convertEnum(enumData){
  const data = {...enumData};
  data.PackagetourNavMap  = {};
  if(data.PackagetourNavConfig){
    const PackagetourNavMap = {};
    Object.keys(data.PackagetourNavConfig).forEach((k)=>{
        const {primary_nav:primaryNav,secondary_nav:secondaryNav} = data.PackagetourNavConfig[k];
        if(!PackagetourNavMap[primaryNav]){
          PackagetourNavMap[primaryNav] = [];
        }
        PackagetourNavMap[primaryNav].push(secondaryNav);
    })
    data.PackagetourNavMap = {...PackagetourNavMap};
  }
  if(data.IndependentTravelNavConfig){
    const IndependentTravelNavMap = {};
    Object.keys(data.IndependentTravelNavConfig).forEach((k)=>{
        const {primary_nav:primaryNav,secondary_nav:secondaryNav} = data.IndependentTravelNavConfig[k];
        if(!IndependentTravelNavMap[primaryNav]){
          IndependentTravelNavMap[primaryNav] = [];
        }
        IndependentTravelNavMap[primaryNav].push(secondaryNav);
    })
    data.IndependentTravelNavMap = {...IndependentTravelNavMap};
  }
  return data;
}

export default {
  namespace: 'enum',

  state: {
    YseNo:{0:'否',1:'是'},
    State:{0:'停用',1:'启用'},
    Gender:{0:'男',1:'女'},

    PdDirection:{1:'出境',2:'国内'},
    NavLevel:{1:'一级',2:'二级'},

    PdType:{1:'跟团游',2:'单机票',3:'单订房',4:'单签证',5:'自由行'},

    Continent:{AF:'非洲',EU:'欧洲',AS:'亚洲',OA:'大洋洲',NA:'北美洲',SA:'南美洲',AN:'南极洲'},
    CountryBelong:{AO:'AF',AF:'AS',AL:'EU',DZ:'AF',AD:'EU',AI:'SA',AG:'NA',AR:'SA',AM:'AS',AU:'OA',AT:'EU',AZ:'AS',BS:'NA',BH:'AS',BD:'AS',BB:'NA',BY:'EU',BE:'EU',BZ:'NA',BJ:'AF',BM:'NA',BO:'SA',BW:'AF',BR:'SA',BN:'AS',BG:'EU',BF:'AF',MM:'AS',BI:'AF',CM:'AF',CA:'NA',CF:'AF',TD:'AF',CL:'SA',CN:'AS',CO:'SA',CG:'AF',CK:'OA',CR:'NA',CU:'NA',CY:'AS',CZ:'EU',DK:'EU',DJ:'AF',DO:'NA',EC:'SA',EG:'AF',SV:'NA',EE:'EU',ET:'AF',FJ:'OA',FI:'EU',FR:'EU',GF:'SA',GA:'AF',GM:'AF',GE:'AS',DE:'EU',GH:'AF',GI:'EU',GR:'EU',GD:'NA',GU:'OA',GT:'NA',GN:'AF',GY:'SA',HT:'NA',HN:'NA',HK:'AS',HR:'EU',HU:'EU',IS:'EU',IN:'AS',ID:'AS',IR:'AS',IQ:'AS',IE:'EU',IL:'AS',IT:'EU',JM:'NA',JP:'AS',JO:'AS',KH:'AS',KZ:'AS',KE:'AF',KR:'AS',KW:'AS',KG:'AS',LA:'AS',LV:'EU',LB:'AS',LS:'AF',LR:'AF',LY:'AF',LI:'EU',LT:'EU',LU:'EU',MO:'AS',MG:'AF',MW:'AF',MY:'AS',MV:'AS',ML:'AF',MT:'EU',MU:'AF',MX:'NA',MD:'EU',MC:'EU',MN:'AS',MS:'NA',MA:'AF',MZ:'AF',NA:'AF',NR:'OA',NP:'AS',NL:'EU',NZ:'OA',NI:'NA',NE:'AF',NG:'AF',KP:'AS',NO:'EU',OM:'AS',PK:'AS',PA:'NA',PG:'OA',PY:'SA',PE:'SA',PH:'AS',PL:'EU',PF:'OA',PT:'EU',PR:'NA',QA:'AS',RO:'EU',RU:'EU',LC:'NA',VC:'SA',SM:'EU',ST:'AF',SA:'AS',SN:'AF',SC:'AF',SL:'AF',SG:'AS',SK:'EU',SI:'EU',SB:'OA',SO:'AF',ZA:'AF',ES:'EU',LK:'AS',SD:'AF',SR:'SA',SZ:'AF',SE:'EU',CH:'EU',SY:'AS',TW:'AS',TJ:'AS',TZ:'AF',TH:'AS',TG:'AF',TO:'OA',TT:'NA',TN:'AF',TR:'AS',TM:'AS',UG:'AF',UA:'EU',AE:'AS',GB:'EU',US:'NA',UY:'SA',UZ:'AS',VE:'SA',VN:'AS',YE:'AS',YU:'EU',ZW:'AF',ZR:'AF',ZM:'AF'},
    Country:{AD: "安道尔共和国",AE: "阿拉伯联合酋长国",AF: "阿富汗",AG: "安提瓜和巴布达",AI: "安圭拉岛",AL: "阿尔巴尼亚",AM: "亚美尼亚",AO: "安哥拉",AR: "阿根廷",AT: "奥地利",AU: "澳大利亚",AZ: "阿塞拜疆",BB: "巴巴多斯",BD: "孟加拉国",BE: "比利时",BF: "布基纳法索",BG: "保加利亚",BH: "巴林",BI: "布隆迪",BJ: "贝宁",BM: "百慕大群岛",BN: "文莱",BO: "玻利维亚",BR: "巴西",BS: "巴哈马",BW: "博茨瓦纳",BY: "白俄罗斯",BZ: "伯利兹",CA: "加拿大",CF: "中非共和国",CG: "刚果",CH: "瑞士",CK: "库克群岛",CL: "智利",CM: "喀麦隆",CN: "中国",CO: "哥伦比亚",CR: "哥斯达黎加",CU: "古巴",CY: "塞浦路斯",CZ: "捷克",DE: "德国",DJ: "吉布提",DK: "丹麦",DO: "多米尼加共和国",DZ: "阿尔及利亚",EC: "厄瓜多尔",EE: "爱沙尼亚",EG: "埃及",ES: "西班牙",ET: "埃塞俄比亚",FI: "芬兰",FJ: "斐济",FR: "法国",GA: "加蓬",GB: "英国",GD: "格林纳达",GE: "格鲁吉亚",GF: "法属圭亚那",GH: "加纳",GI: "直布罗陀",GM: "冈比亚",GN: "几内亚",GR: "希腊",GT: "危地马拉",GU: "关岛",GY: "圭亚那",HK: "香港",HN: "洪都拉斯",HR: "克罗地亚",HT: "海地",HU: "匈牙利",ID: "印度尼西亚",IE: "爱尔兰",IL: "以色列",IN: "印度",IQ: "伊拉克",IR: "伊朗",IS: "冰岛",IT: "意大利",JM: "牙买加",JO: "约旦",JP: "日本",KE: "肯尼亚",KG: "吉尔吉斯坦",KH: "柬埔寨",KP: "朝鲜",KR: "韩国",KW: "科威特",KZ: "哈萨克斯坦",LA: "老挝",LB: "黎巴嫩",LC: "圣卢西亚",LI: "列支敦士登",LK: "斯里兰卡",LR: "利比里亚",LS: "莱索托",LT: "立陶宛",LU: "卢森堡",LV: "拉脱维亚",LY: "利比亚",MA: "摩洛哥",MC: "摩纳哥",MD: "摩尔多瓦",MG: "马达加斯加",ML: "马里",MM: "缅甸",MN: "蒙古",MO: "澳门",MS: "蒙特塞拉特岛",MT: "马耳他",MU: "毛里求斯",MV: "马尔代夫",MW: "马拉维",MX: "墨西哥",MY: "马来西亚",MZ: "莫桑比克",NA: "纳米比亚",NE: "尼日尔",NG: "尼日利亚",NI: "尼加拉瓜",NL: "荷兰",NO: "挪威",NP: "尼泊尔",NR: "瑙鲁",NZ: "新西兰",OM: "阿曼",PA: "巴拿马",PE: "秘鲁",PF: "法属玻利尼西亚",PG: "巴布亚新几内亚",PH: "菲律宾",PK: "巴基斯坦",PL: "波兰",PR: "波多黎各",PT: "葡萄牙",PY: "巴拉圭",QA: "卡塔尔",RO: "罗马尼亚",RU: "俄罗斯",SA: "沙特阿拉伯",SB: "所罗门群岛",SC: "塞舌尔",SD: "苏丹",SE: "瑞典",SG: "新加坡",SI: "斯洛文尼亚",SK: "斯洛伐克",SL: "塞拉利昂",SM: "圣马力诺",SN: "塞内加尔",SO: "索马里",SR: "苏里南",ST: "圣多美和普林西比",SV: "萨尔瓦多",SY: "叙利亚",SZ: "斯威士兰",TD: "乍得",TG: "多哥",TH: "泰国",TJ: "塔吉克斯坦",TM: "土库曼斯坦",TN: "突尼斯",TO: "汤加",TR: "土耳其",TT: "特立尼达和多巴哥",TW: "台湾省",TZ: "坦桑尼亚",UA: "乌克兰",UG: "乌干达",US: "美国",UY: "乌拉圭",UZ: "乌兹别克斯坦",VC: "圣文森特岛",VE: "委内瑞拉",VN: "越南",YE: "也门",YU: "南斯拉夫",ZA: "南非",ZM: "赞比亚",ZR: "扎伊尔",ZW: "津巴布韦"},

    BindState:{0:'未绑定',1:'已绑定'},
    TrafficKind:{1:'单程',2:'往返'},
    TicketKind:{1:'机票',2:'火车票'},

    
    StarLevel:{1:'一星'},
    PlusDay:{1:'+1',2:'+2'},
    ExtraBed:{0:'不可',1:'可加'},
    HaveOrNot:{0:'无',1:'有'},

    Include:{1:'不包含',2:'包含'},
    PriceType:{1:'基准同行价',2:'其他同行价'},
    front_enum:'',
    Flow:{0:'未进行',1:'未提交',2:'待审批',3:'拒审批',4:'审核通过'},
    Opinion:{0:'提交',1:'通过',2:'不通过',3:'取消',4:'撤销'},
    GroupState: {1:'收客',2:'截止',3:'结算'},
    ShelfState:{1:'未上架',2:'待上架',3:'已上架'},
    ApproveType:{1:'erp审批',2:'b2b审批'},
    SuppType:{0:'客户吸纳',1:'本地添加'},
    Hour:{1:'1小时',2:'2小时'},
    OrderState:{1:'未占位',2:'占位待确认',3:'占位已确认',4:'占位已拒绝',5:'实报未提交',6:'实报待确认'
    ,7:'实报已确认',8:'实报已拒绝'},
    OrderKind:{1:'三方',2:'自营',3:'过账'}
  },

  effects: {
    *fetch({payload}, { call, put ,select}) {
      
      const ver =  yield select(state => state.enum.ver);

      if(payload.ver && payload.ver !== ver){
        try {
          const data = yield call(queryEnum,payload.ver);
          const EnumData = convertEnum(data);
          yield put({
            type: 'save',
            payload: EnumData,
          });
        } catch (error) {
          console.log(error);
          return true;
        }
      }
      return true;
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
        front_enum:action.payload.ver
      };
    },
    addEditPath(state,action){
      return {
        ...state,
        ...action.payload
      }
    },
    setFrontEnum(state,action){
      return {
        ...state,
        front_enum:action.payload.ver
      }
    }
  },
};
