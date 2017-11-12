window.onload = function() {
    //调用搜素框JS
    searchEffect();
    //调用倒计时JS
    downTimeEffect();
    //调用轮播图JS
    slideEffect();
};
/*搜索框JS渐变效果 这个函数只是为了区分功能块*/
function searchEffect() {
    /**
     * 1. 需求 当滚动条滚动的距离不超过轮播图的高度的时候 搜索框的透明度就在0-1之间渐变
     * 当滚动条滚动的距离超过了轮播图的高度 搜索框透明度就固定是1
     */
    /**
     * 2. 实现思路:
     * 1. 添加一个滚动条的滚动事件onscroll
     * 2. 获取滚动条的滚动距离 documnet.body.scrollTop;
     * 3. 获取轮播图容器的高度
     * 4. 判断滚动条距离是否大于轮播图的高度
     * 5. 如果小于轮播图高度 实现渐变 
     * 6. 计算搜素框的透明度 滚动条滚动的距离/轮播图的高度
     * 7. 把透明度设置到搜素框的rgba
     * 8. 如果滚动条距离大于轮播图的高度 设置rbga 透明度1
     */
    var searchBox = document.querySelector('#topbar');
    window.addEventListener('scroll', function() {
        var scrollTop = document.body.scrollTop;
        // console.log(scrollTop);
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollTop < slideHeight) {
            var opcity = scrollTop / slideHeight;
            searchBox.style.backgroundColor = 'rgba(201,21,35,' + opcity + ')';
        } else {
            searchBox.style.backgroundColor = 'rgba(201,21,35,1)';
        }
    })
}
/*倒计时JS效果 这个函数只是为了区分功能块*/
function downTimeEffect() {
    /**
     * 倒计时效果： 要有一个总时间 每秒总时间减少一秒 减完之后分别设置到时分秒对应的span上
     */
    /**
     * 1. 定义一个总时间 1*60*60 == 3600
     * 2. 定义一个定时器 每秒执行一次
     * 3. 在定时器里面 总时间--
     * 4. 分别计算减完之后的总时间的时分秒
     *        时 ： 3600 / 3600 == 1  总时间 / 3600
     *        分 :  3700 % 3600 / 60  总时间 % 3600 / 60
     *        秒 ： 100 % 60 总时间 % 60
     * 5. 获取倒计时所有span分别设置时分秒对应的十位和个位
     */
    /*获取未来时间 今天中午12点 .getTime()把获取到的时间转换成毫秒数*/
    var futureTime = new Date("August 8,2017 12:00:00").getTime();
    /*这个时间从1970 1.1到今天中午12点的时间差*/
    // console.log(futureTime/1000);
    var nowTime = new Date().getTime();
    // console.log(nowTime/1000);
    var time = (futureTime - nowTime) / 1000;
    //定义总时间
    // var time = 3600;
    //开启定时器
    var timeId = setInterval(function() {
        /*总时间--*/
        time--;
        if (time < 0) {
            clearInterval(timeId)
            return;
        }
        /*时*/
        var hour = Math.floor(time / 3600);
        /*分*/
        var minute = Math.floor(time % 3600 / 60);
        /*秒*/
        var second = Math.floor(time % 60);
        //获取所有倒计时span元素 要带All
        var spans = document.querySelectorAll('.seckill-downTime span');

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);
    }, 1000);
}

function slideEffect() {
    /**
     * 1. 实现轮播图无缝自动轮播
       2. 实现轮播图的左右滑动和预览图片
       3. 实现轮播滑动结束后判断切换到上一张和下一张和回弹
       4. 实现轮播图切换后小圆点也跟着变动
     */
    /**
     *  实现自动无缝轮播
     *  1. 定义一个轮播图索引（当前已经滚动到了第几张图片 根据索引计算要偏移的值）
     *  2. 定义一个定时器 每秒走一张 index++
     *  3. 设置位移index*一张轮播图的宽度
     *  4. 设置过渡效果transition
     *  5. 判断当轮播图从第8张切换到第一张切换完成后 index=1 设置位移悄悄到index=1的位置 清除过渡
     */
    /*实现轮播图左右滑动预览图片
        1. 添加滑动开始和滑动中事件
        2. 记录滑动开始的X轴的位置
        3. 记录滑动中的X轴的位置
        4. 用滑动中的X-滑动开始的X 求得滑动的距离
        5. 设置轮播图的偏移 (-index*slideWidth+距离)
        6. 由于轮播图默认有过渡效果 清除过渡
        7. 滑动开始的时候清除定时器
    */
    /*实现轮播图滑动结束之后 翻页还是回弹
    1. 添加滑动结束事件
    2. 判断当前滑动的距离是否超过了轮播图宽度的1/3
    3. 如果超过了轮播图宽度的1/3就做翻页
    4. 如果不超过1/3就回弹
    5. 如果是翻页 判断距离是正值 表示是从左往右滑动 切换到上一张 index-- 还是负值 从右往左滑 切换到下一张 index++
    6. 回弹 回到没有滑动之前的位置 -index*slideWidth
    */
    /*实现轮播图切换的时候小圆点也跟着切换
     1. 获取所有的小圆点元素
     2. 当一张图片切换完成后 小圆点也跟着切换
     3. 给小圆点添加一个active类名 小圆点背景色白色
     4. 在过渡完成事件里面 删除所有小圆的active类名
     5. 给当前轮播图对应的小圆点添加active类名 index对应的小圆点的索引  index-1
    */
    //获取轮播图容器
    var slide = document.querySelector('#slide');
    //一张轮播图的宽度
    var slideWidth = slide.offsetWidth;
    //轮播图ul
    var slideUl = document.querySelector('#slide ul:first-of-type');
    /*小圆点*/
    var indictors = document.querySelectorAll('#slide ul:last-of-type li');
    /*定义一个轮播图的索引 因为轮播图有一个默认的偏移 默认显示的是第二个li index=1*/
    var index = 1;
    /*timeId是时钟的id*/
    var timeId;
    /*封装了一个开启时钟的函数 */
    //表示过渡是否完成了
    var flag = true;

    function startTime() {
        timeId = setInterval(function() {
            index++;
            //设置位移 位移的值 index*轮播图的宽度(slideWidth) 要带px单位
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            //设置过渡 过渡需要带单位s
            slideUl.style.transition = 'all 0.2s';
            //刚刚添加了过渡 肯定还没有完成
            flag = false;
        }, 1000);
    }
    startTime();
    /*过渡完成事件的添加 transitionend过渡完成事件 只能用addEventListener方式添加*/
    slideUl.addEventListener('transitionend', function() {
        //过渡完成事件都已经触发了表示过渡就完成了
        flag = true;
        if (index == 9) { //等0.2s再判断这时候第8张切换到第一张已经过渡完成了
            index = 1;
            //设置位移 位移的值 index*轮播图的宽度(slideWidth) 要带px单位
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            //设置过渡 过渡需要带单位s
            slideUl.style.transition = 'none';
        }
        if (index == 0) { //当轮播图滑动从第一张往左滑动到第8张的过渡完成后要跳到第8张的真实位置index=8 设置位移清除过渡 悄悄过去
            index = 8;
            //设置位移 位移的值 index*轮播图的宽度(slideWidth) 要带px单位
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            //设置过渡 过渡需要带单位s
            slideUl.style.transition = 'none';
        }
        for (var i = 0; i < indictors.length; i++) {
            indictors[i].classList.remove('active');
        }
        indictors[index - 1].classList.add('active');
    });
    var startX = 0,
        moveX = 0,
        distanceX = 0;
    slideUl.addEventListener('touchstart', function(e) {
        //获取开始的位置
        startX = e.touches[0].clientX;
        //滑动开始清除时钟
        clearInterval(timeId);
    });
    slideUl.addEventListener('touchmove', function(e) {
        //当过渡完成了才能执行滑动操作
        if (flag == true) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            /*设置位移 加上轮播图已经到达的位置 + 滑动距离*/
            slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
            /*因为在自动轮播会加过渡 过渡只要不清楚就一直存在 滑动的时候已经很慢不需要过渡 清除过渡*/
            slideUl.style.transition = 'none';
        }
    });
    slideUl.addEventListener('touchend', function() {
        if (flag == true) {
            /*因为距离有可能是负值 取绝对值来和轮播图宽度进行判断 Math.abs(distanceX)*/
            if (Math.abs(distanceX) > (slideWidth / 3)) {
                //翻页
                if (distanceX > 0) {
                    /*正值 表示是从左往右滑动 切换到上一张 index-- */
                    index--;
                    //设置位移 位移的值 index*轮播图的宽度(slideWidth) 要带px单位
                    slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                    //设置过渡 过渡需要带单位s
                    slideUl.style.transition = 'all 0.2s';
                    //刚刚添加了过渡 肯定还没有完成
                    flag = false;
                } else {
                    /*还是负值 从右往左滑 切换到下一张 index++*/
                    index++;
                    //设置位移 位移的值 index*轮播图的宽度(slideWidth) 要带px单位
                    slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                    //设置过渡 过渡需要带单位s
                    slideUl.style.transition = 'all 0.2s';
                    flag = false;
                }
            } else {
                //回弹
                //设置位移 位移的值 index*轮播图的宽度(slideWidth) 要带px单位
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                //设置过渡 过渡需要带单位s
                slideUl.style.transition = 'all 0.2s';
                flag = false;
            }
        }
        //滑动结束了 重新开启时钟
        startTime();
    });
}
