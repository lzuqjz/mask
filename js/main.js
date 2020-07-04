var main = d3.select('main')
var scrolly = main.select('.scrolly');//selectAll后才选上2pt section；但是滚动方式未变
var figure = scrolly.select('figure');
var setHeight=figure.select('#set-height_video');
var video=setHeight.select('#v0')
var pic=setHeight.select('.pic')
var pic1=setHeight.select('.pic1')
var article = scrolly.select('article');
var step = article.selectAll('.step');
var n_step=article.selectAll('.non-scro-step')
// var fir1=setHeight.select('.fir_1')
// var fir1=setHeight.select('.fir_1')
// var fir1=setHeight.select('.fir_1')
// var fir1=setHeight.select('.fir_1')

var v_cutoff=0;
var div_ini_Yoffset=0;//TODO:可能完善的地方：获得div的高度，对应frameNumber会不会单适应，避免其它矛盾？


var scrolly_2pt = main.select('#scrolly_2pt');
var figure_2pt = scrolly_2pt.select('figure');
var step_2pt = scrolly_2pt.selectAll('.step_2pt');
var pt2_pic_1=figure_2pt.select('#diameter-hangtime');
var pt2_pic_2=figure_2pt.select('#speed-cmp');
var pt2_pic_3=figure_2pt.select('#seudoPFEofMasks');
var pt2_pic_4=figure_2pt.select('#face-touching');
var pt2_pic_5=figure_2pt.select('#materials-cmp');
var pt2_n_step=scrolly_2pt.selectAll('.pt2_non-scro-step');


var scroller = scrollama();
var scroller_2pt=scrollama();


function handleResize() {
    var stepH = Math.floor(window.innerHeight);
    step.style('height', stepH + 'px');
    n_step.style('height', stepH + 'px');
     step_2pt
        .style('margin-bottom',window.innerHeight+'px');
     pt2_n_step
         .style('margin-bottom',window.innerHeight+'px');
    //TODO:它俩随视窗大小而变造成了video在其它高度下与scroll不耦合

    var figureHeight = window.innerHeight / 1.2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    var figure_2ptHeight = window.innerHeight / 1.3;
    var figure_2ptMarginTop = (window.innerHeight - figure_2ptHeight) / 2;

    v_cutoff=stepH+window.innerHeight;

    figure
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');
    video
        .style('height',figureHeight+'px')
    figure_2pt
        .style('height', figure_2ptHeight + 'px')
        .style('top', figure_2ptMarginTop + 'px');
    pt2_pic_1
        .style('height',window.innerHeight*0.6+'px')
        .style('width',window.innerWidth*0.6+'px');
    pt2_pic_2
        .style('height',window.innerHeight*0.6+'px')
        .style('width',window.innerWidth*0.6+'px');
    pt2_pic_3
        .style('height',window.innerHeight*0.6+'px')
        .style('width',window.innerWidth*0.6+'px');
    pt2_pic_4
        .style('height',window.innerHeight*0.6+'px')
        .style('width',window.innerWidth*0.6+'px');
    pt2_pic_5
        .style('height',window.innerHeight*0.6+'px')
        .style('width',window.innerWidth*0.6+'px');

    scroller.resize();
    scroller_2pt.resize();
}


function handleStepEnter(response) {
    step.classed('is-active', function(d, i) {
        return i === response.index;
    });
    response.index===0?video.style('display','block'):video.style('display','none');
    response.index===1?pic.style('display','block'):pic.style('display','none');
    response.index===2?pic1.style('display','block'):pic1.style('display','none');
}

function handleStepEnter_2pt(response_2pt) {
    step_2pt.classed('is-active', function(d, i) {
        return i === response_2pt.index;
    });
    if (response_2pt.index===0)
        myChart1.setOption(option1);
    if (response_2pt.index===1)
        myChart2.setOption(option2);
    if (response_2pt.index===2)
        myChart3.setOption(option3);
    if (response_2pt.index===3)
        myChart4.setOption(option4);
    if (response_2pt.index===4)
        myChart5.setOption(option5);
    response_2pt.index===0?pt2_pic_1.style('display','block'):pt2_pic_1.style('display','none');
    response_2pt.index===1?pt2_pic_2.style('display','block'):pt2_pic_2.style('display','none');
    response_2pt.index===2?pt2_pic_3.style('display','block'):pt2_pic_3.style('display','none');
    response_2pt.index===3?pt2_pic_4.style('display','block'):pt2_pic_4.style('display','none');
    response_2pt.index===4?pt2_pic_5.style('display','block'):pt2_pic_5.style('display','none');
}

function setupStickyfill() {
    d3.selectAll('.sticky').each(function() {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();
    handleResize();

    scroller.setup({
            step: '.scrolly article .step',
            offset: 0.8,
            debug: false,
        })
        .onStepEnter(handleStepEnter);

    scroller_2pt.setup({
            step:'#scrolly_2pt .step_2pt',
            offset: 0.6,
            debug: false,
        }).onStepEnter(handleStepEnter_2pt);

    window.addEventListener('resize', handleResize);
}


// ##视频滑动SCRIPT
var frameNumber = 0,
    playbackConst = 500,
    setHeight = document.getElementById("set-height_video"),
    vid = document.getElementById('v0');

vid.addEventListener('loadedmetadata', function() {
    setHeight.style.height = (Math.floor(vid.duration) * playbackConst) + "px";
});


function scrollPlay(){
    console.log(window.pageYOffset);
    var frameNumber  = (window.pageYOffset-v_cutoff+600)/playbackConst;
    vid.currentTime  = frameNumber;
    window.requestAnimationFrame(scrollPlay);
}

window.requestAnimationFrame(scrollPlay);

init();

