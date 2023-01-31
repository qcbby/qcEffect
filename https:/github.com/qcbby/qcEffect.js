//qcEffect  0.0.1 beta
log('qcEffect的作者是qcbby当前版本：0.0.1 beta ')
//
//MOTD
var ml = "./plugins/qcEffect/MOTD/";

if(!file.exists(ml+"config.json")){//生成配置
    file.mkdir(ml);
    let c = 
    {
        "content":[
            "§eMOTD 1§r",
            "§aMOTD 2§r",
            "§bMOTD 3§r"
        ],
        "interval":5
    };
    let cfg_json = JSON.stringify(c,null,'\t');
    file.writeTo(ml+"config.json",cfg_json)
}

let m = JSON.parse(file.readFrom(ml+'config.json'))//读配置
let l = 0

function change_motd(){//motd显示
    mc.setMotd(m.content[l])
    if(m.content.length == l+1){
        l = 0
    }
    else{
        l += 1
    }
}

setInterval(change_motd,m.interval * 3000);//延时
//
//
//欢迎
let pl_name = "qcEffect\\Join";
var conf_path = '.\\Plugins\\'+`${pl_name}`+'\\Config.json'//定位配置

var conf = new JsonConfigFile(`${conf_path}`)//生成配置
conf.init('主标题','欢迎来到xxx服务器')
conf.init('副标题','hhhhh')
conf.init('主开关','true')
conf.init('副开关','true')

var title1_txt = conf.get('主标题')//读取内容
var title2_txt = conf.get('副标题')
var title1_switch = conf.get('主开关')
var title2_switch = conf.get('副开关')

mc.listen("onJoin", join_hello)//监听进入服务器
//发送欢迎
function join_hello(pl){
    if(title1_switch=='true'){//主标题 
        pl.setTitle(`${title1_txt}`)
    }
    else{
        logger.warn('主标题已关闭')
    }
    if(title2_switch=='true'){//副标题
        pl.setTitle(`${title2_txt}`,3)
    }
    else{
        logger.warn('副标题已关闭')
    } 
}
//
//
let clock_name = "qcEffect\\clock";
var conf_path = '.\\Plugins\\'+`${clock_name}`+'\\Config.json'

var conf = new JsonConfigFile(`${conf_path}`)

conf.init("自动给钟开关","true")

var clock1_txt = conf.get("自动给钟开关")//读取内容

mc.regPlayerCmd("clockqc","获取时钟(give clock)",function(pl,arr){
    mc.runcmdEx(`give "${pl.name}" clock`);
    pl.tell('§l§d[Clockqc] §6你获得了一个钟');  
    log("玩家 " + pl.name + " 获得了"+" clock*1");
});

mc.listen("onJoin",function(pl,arr){  
    if(clock1_txt=="true"){ 
        pl.tell('§l§d[Clockqc] §6你获得了一个钟')  
        mc.runcmdEx(`give "${pl.name}" clock`)
        log("自动给钟 " + pl.name + " clock*1")
    }
    else{
        pl.tell('[clockqc]§l§g自动给钟已关闭')  
        logger.warn('自动给钟已关闭,qcEffect /clock/Config.json可以打开')
    }   
});


