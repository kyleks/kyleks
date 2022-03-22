auto.waitFor(); //辅助权限授予

threads.start(function() { //开启子线程
    //监听音量键-，关闭所有脚本
    events.observeKey();
    events.onKeyDown("volume_up", function(event) { //音量+改为volume_up
        device.setBrightnessMode(1) //0为手动亮度，1为自动
        engines.stopAllAndToast();
    });

})

//shell("svc wifi enable", true) //开
device.setMusicVolume(0) //
device.setBrightnessMode(0) //0为手动亮度，1为自动亮度
device.setBrightness(0) //手动亮度，范围0~255


//控制器
var timers = function(fn, num) {
    for (var i = 0; i < num; i++) {
        fn();
    }
}

//向控制器传入要执行的函数和执行次数


launchApp("学习强国");


function read() {
    className("android.widget.TextView").text("要闻").waitFor()
    click("要闻");
    for (var i = 0; i < 2; i++) {
        sleep(2000);
        click(device.width / 2, device.height / 2);
        console.show();
        console.setPosition(device.width / 10, device.height / 20);
        console.log("正在进行第" + (i + 1) + "次阅读");
        timers(hd, 2);
        console.hide();
        sleep(1000);
        back();
        sleep(1000);
        sml_move(device.width * 3 / 4, device.height * 2 / 3, device.width * 3 / 4, device.height * 1 / 2, 2000);

    };

    for (var n = 0; n < 2; n++) {
        var i = random(1, 4);
        q = new Array()
        q[1] = "热爱祖国，努力奋进！";
        q[2] = "团结奋斗";
        q[3] = "跟党走，听党话";
        q[4] = "跟党走，强国富民";
        /*q[5] = '李';
        q[6] = '周';
        q[7] = '吴';
        q[8] = '郑';
        q[9] = '王';
        q[0] = '公孙';*/
        var t = q[i]
        sleep(2000);
        click(device.width / 2, device.height / 2);
        sleep(2000);
        click(device.width * 0.92, device.height * 0.96) //点击分享按钮
        sleep(1000);
        click("分享到学习强国");
        sleep(1000);
        back();
        sleep(2000);
        click("欢迎发表你的观点");
        sleep(2000);
        log(t)
        setText(0, t);
        sleep(1000);
        click("发布")
        sleep(500);
        back();
        sleep(2000);
        sml_move(device.width * 3 / 4, device.height * 3 / 4, device.width * 3 / 4, device.height * 1 / 2, 2000);
    };
};

function videos() {
    className("android.widget.TextView").text("山东").waitFor();
    className("android.widget.TextView").text("山东").findOne().parent().click();
    sleep(2000);
    click("山东卫视");
    console.show();
    console.setPosition(device.width / 10, device.height / 20);
    console.log("视频观看第一次");
    sleep(60 * 1000);
    console.log("已经观看1分钟");
    click("东方卫视");
    console.log("视频观看第二次");
    sleep(60 * 1000);
    console.log("已经观看2分钟");
    click("江苏卫视");
    console.log("视频观看第三次");
    sleep(60 * 1000);
    console.log("已经观看3分钟");
    click("浙江卫视");
    console.log("视频观看第四次");
    sleep(60 * 1000);
    console.log("已经观看4分钟");
    click("安徽卫视");
    console.log("视频观看第五次");
    sleep(60 * 1000);
    console.log("已经观看5分钟");
    click("东南卫视");
    console.log("视频观看第六次");
    sleep(60 * 1000);
    console.log("已经观看6分钟");
    sleep(60 * 1000);
    console.hide();
    back();
};



function hd() {
    sleep(10 * 1000);
    sml_move(device.width / 8, device.height * 4 / 6, device.width * 3 / 4, device.height / 6, 1000);
};

function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by; 

    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    }
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
} 

//仿真随机带曲线滑动
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    }

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    }
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    }
    var dx3 = {
        "x": zx,
        "y": zy
    }
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    }
    //log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    //log(xxy);
    gesture.apply(null, xxy);
}
read()
videos()
device.setBrightnessMode(1) //0为手动亮度，1为自动亮度
engines.stopAllAndToast();