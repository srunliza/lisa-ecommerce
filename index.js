$(document).ready(function () {

    const body = $("body");
    const popup = `
        <div class="popup"></div>
    `;

    const itemList = [
        {
            name: "Apple",
            subMenu: ["iPhone", "iWatch", "iMac"],
            img: "img/1.webp"
        },
        {
            name: "Google",
            subMenu: ["Google Search", "Google Map", "FireBase"],
            img: "img/2.jpg"
        },
        {
            name: "Meta",
            subMenu: ["Facebook", "Instagram", "Messanger"],
            img: "img/3.jpg"
        },
        {
            name: "Amazon",
            subMenu: ["Amazon Online Shop", "AWS"],
            img: "img/4.jpg"
        },
    ];

    const cityList = [
        {
            name: "Phnom Penh",
            sub: [
                {
                    name: "BKK",
                    sub: ["BKK1", "BKK2", "BKK3"]
                },
                {
                    name: "TK",
                    sub: ["TK1", "TK2", "TK3"]
                },
                {
                    name: "TP",
                    sub: ["TP1", "TP2", "TP3"]
                },
                {
                    name: "SK",
                    sub: ["SK1", "SK2", "SK3"]
                }
            ]

        },
        {
            name: "Kampong Chhnang",
            sub: [
                {
                    name: "Kampong",
                    sub: ["K1", "K2", "K3"]
                },
                {
                    name: "Chnang",
                    sub: ["C1", "C2", "C3"]
                },
                {
                    name: "KL",
                    sub: ["KL1", "KL2", "KL3"]
                },
                {
                    name: "KOR",
                    sub: ["KOR1", "KOR2", "KOR3"]
                }
            ]

        },
        {
            name: "Takeo",
            sub: [
                {
                    name: "TK1",
                    sub: ["TK1-1", "TK1-2", "TK1-3"]
                },
                {
                    name: "TK2",
                    sub: ["TK2-1", "TK2-2", "TK2-3"]
                },
                {
                    name: "TK3",
                    sub: ["TK3-1", "TK3-2", "TK3-3"]
                },
                {
                    name: "TK4",
                    sub: ["TK4-1", "TK4-2", "TK4-3"]
                }
            ]

        }

    ]

    const imgList = [
        [
            "img/gallery/1-1.jpg",
            "img/gallery/1-2.jpg",
            "img/gallery/1-3.jpg",
            "img/gallery/1-4.jpg",
        ],
        [
            "img/gallery/2-1.jpg",
            "img/gallery/2-2.jpg",
            "img/gallery/2-3.jpg",
            "img/gallery/2-4.jpg"
        ],
        [
            "img/gallery/3-1.jpg",
            "img/gallery/3-2.jpg",
            "img/gallery/3-3.jpg",
            "img/gallery/3-4.jpg"
        ],
        [
            "img/gallery/4-1.jpg",
            "img/gallery/4-2.jpg",
            "img/gallery/4-3.jpg",
            "img/gallery/4-4.jpg"
        ],
    ]




    //Friend list
    const getFriend = () => {
        let txt = "";
        itemList.forEach(e => {
            txt += `
                <li>
                    <img src="${e.img}" alt="">
                    <span>${e.name}</span>
                </li>
            `
        })
        $(".friend-list").find("ul").html(txt);
    }
    getFriend();

    $(".friend-list").on("click", "h1", function () {
        var Parent = $(this).parent();
        console.log(Parent.height());
        if (Parent.height() == 50) {
            Parent.css({ "height": "350px" })
        } else {
            Parent.css({ "height": "50px" })
        }

    })
    //Click for chart to friends
    $(".friend-list").on("click", "ul li", function () {
        var chartCn = $(".chart-container");
        var eThis = $(this);
        var name = eThis.find("span").text();
        var img = eThis.find("img").attr("src");
        var chartBox = `
            <div class="chart-box" id="c${eThis.index()}">
                <div class="header">
                    <img src="${img}" alt="">
                    <span>${name}</span>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        `;
        var numChart = chartCn.find(`#c${eThis.index()}`).length;
        console.log(numChart)
        if (numChart == 0) {
            chartCn.append(chartBox);
            if (chartCn.find(".chart-box").length > 3) {
                chartCn.find(".chart-box").eq(0).remove();
            }
        }
    })

    //Click remove chart with friends
    $(".chart-container").on("click", "i", function () {
        $(this).parents(".chart-box").remove();
    })





    //Filter city
    const getCityList = () => {
        let txt = "<option  value='-1'>Choose City</option>"
        cityList.forEach((el, i) => {
            txt += `
                <option value="${i}">${el.name}</option>
            `
        })
        $("#txt-city").html(txt);
    }
    getCityList();


    var cityIndex = 0;
    //Get filter district
    $("#txt-city").change(function () {
        var eThis = $(this);
        var cityInd = eThis.val();
        if (cityInd == -1) {
            $("#txt-district").empty();
            $("#txt-communes").empty();
            return;
        }
        let txt = "<option value='-1'>District</option>"
        cityList[cityInd].sub.forEach((el, i) => {
            txt += `
                <option value="${i}">${el.name}</option>
            `
        })
        $("#txt-district").html(txt);
        cityIndex = cityInd;
    })

    //Get filter communes
    $("#txt-district").change(function () {
        var eThis = $(this);
        var districtInd = eThis.val();
        console.log(cityIndex);
        if (districtInd == -1) {
            $("#txt-communes").empty();
            return;
        }
        let txt = "<option value='-1'>Communes</option>";
        console.log("cityInd", cityIndex)
        cityList[cityIndex].sub[districtInd].sub.forEach((el, i) => {
            txt += `
                <option value="${i}">${el}</option>
            `
        })
        $("#txt-communes").html(txt);
    })


    //Img gallery
    const getImgList = () => {
        let txt = "";

        imgList.forEach((e) => {
            txt += `
                <div class="col-md-6 col-xl-3 mb-4 img-box ">
                    <div class="box">
                        <img src="${e[0]}" alt="">
                        <img src="${e[1]}" alt="">
                        <img src="${e[2]}" alt="">
                        <img src="${e[3]}" alt="">
                    </div> 
                </div>
            `
        });
        $('#img-list').html(txt);
    }

    getImgList();

    //Get slide
    function getSlide() {
        let txt = "";
        let txt2 = "";
        itemList.forEach((el, i) => {
            txt += `
                <div class="slide">
                    <img src="${el.img}" alt="">
                    <span>${i + 1} / ${itemList.length}</span>
                </div>
            `;

            txt2 += `
                <li>${i + 1}</li>
            `;
        });
        $('.slide-box').append(txt);
        $('.pagination').html(txt2);
        $('.pagination').find('li').eq(0).addClass('active');
    }
    getSlide();

    //Slide
    const slide = $('.slide');
    var slideInd = 0;
    var numSlide = slide.length;
    slide.hide()
    slide.eq(slideInd).show();
    //Next slide
    $('.btnNext').click(function () {
        var eThis = $('.pagination');
        eThis.find('li').removeClass("active");
        slide.eq(slideInd).hide();
        slideInd++;
        if (slideInd >= numSlide) {
            slideInd = 0;
        }
        slide.eq(slideInd).show();
        eThis.find('li').eq(slideInd).addClass('active');
    });

    //Pagination click
    $('.pagination').on("click", 'li', function () {
        slide.hide()
        var eThis = $(this);
        eThis.parent().find('li').removeClass("active");
        slide.eq(eThis.index()).show();
        slideInd = eThis.index();
        eThis.addClass('active');
    });

    //Back slide
    $('.btnBack').click(function () {
        var eThis = $(".pagination");
        eThis.find('li').removeClass("active");
        slide.eq(slideInd).hide();
        slideInd--;
        if (slideInd < 0) {
            slideInd = numSlide - 1;
        }
        slide.eq(slideInd).show();
        eThis.find('li').eq(slideInd).addClass("active");
    });

    //Auto slide
    let myAutoSlide = setInterval(function () {
        $(".btnNext").click();
    }, 1000);


    //Stop auto slide on mouseover
    $(".slide-box").mouseover(function () {
        clearInterval(myAutoSlide)
    });

    //Restart auto slide on mouse leave
    $(".slide-box").mouseleave(function () {
        myAutoSlide = setInterval(function () {
            $(".btnNext").click();
        }, 1000);
    });


    //Get all item list
    const getItemList = () => {
        let txt = "";
        let txt2 = "";
        let txt3 = "";
        itemList.forEach((el) => {

            //Navbar item list
            txt += `
                <li>
                    <a href="">${el.name}</a>
                    <ul class="sub-menu">
                        ${getSubItem(el.subMenu)}
                    </ul>
                </li>
            `;

            // Sidebar item list
            txt2 += `
                <li>
                    <a href="" >
                        <span>${el.name}</span>
                        <i class="fa-solid fa-angle-right"></i>
                    </a>
                    <ul class="sub-menu">
                        ${getSubItem(el.subMenu)}
                    </ul>
                </li>
            `
            // Get left item list
            txt3 += `
                <li>
                    <a class="m2">
                        <span>${el.name}</span>
                        <i class="fa-solid fa-plus"></i>

                    </a>
                    <ul class="sub-menu">
                        ${getSubItem(el.subMenu)}
                    </ul>
                </li>
            `
        });
        $(".menu").find("ul").append(txt);
        $('.drawer').find('ul').html(txt2);
        $('.left-menu').find('ul').html(txt3);
    };
    //Get sub item list
    const getSubItem = (data) => {
        let txt = "";
        data.forEach((el) => {
            txt += `
                <li>
                    <a href="">${el}</a>
                </li>
            `;
        });
        return txt;
    };
    getItemList();

    //Show menu left sidebar
    $('.m2').click(function () {
        $(this).parent().find('.sub-menu').slideToggle();
        var opt = $(this).find('.fa-plus');
        console.log(opt.length);
        if (opt.length > 0) {
            $(this).find('i').removeClass('fa-plus');
            $(this).find('i').addClass('fa-minus');
        } else {
            $(this).find('i').removeClass('fa-minus');
            $(this).find('i').addClass('fa-plus');
        }

    });


    //Show drawbar
    $("#btnMenu").click(function () {
        body.append(popup);
        $(".drawer").css({ left: "0" });
    });


    //Remove drawbar
    body.on("click", ".popup", function () {
        $(".drawer").css({ left: "-210px" });
        $(this).remove();
    });

});
