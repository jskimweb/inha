window.onload = function () {
  // 쿠키 가져오기
  function getCookie(cookieName) {
    let search = cookieName + "=";
    let cookie = document.cookie;

    if (cookie.length > 0) {
      startIndex = cookie.indexOf(cookieName);
      if (startIndex != -1) {
        startIndex += cookieName.length;
        endIndex = cookie.indexOf(";", startIndex);
        if (endIndex == -1) endIndex = cookie.length;

        return unescape(cookie.substring(startIndex + 1, endIndex));
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // 쿠키 세팅하기
  function setCookie(name, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
  }

  // 상단 배너 슬라이드
  new Swiper('.sw-top-banner', {
    loop: true,
    slidesPerView: 2,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: '.sw-top-banner__prev',
      nextEl: '.sw-top-banner__next',
    },
    pagination: {
      el: '.sw-top-banner__pg',
      clickable: true,
    },
  });

  // 상단 배너 슬라이드
  const topBannerCheck = $('#top-banner__check');
  const wrap = $('.wrap');
  const wrapMgTop = 'wrap--mg-top';
  const helpListNotice = $('.help-list__notice');
  const helpListNoticeActive = 'help-list__notice--active';

  // 오늘 하루 그만보기 적용
  topBannerCheck.click(function () {
    let temp = $(this).is(':checked');
    if (temp == true) {
      wrap.removeClass(wrapMgTop);
      helpListNotice.removeClass(helpListNoticeActive);
      setCookie('inha_day', 'close', 1);
    } else {
      wrap.addClass(wrapMgTop);
      setCookie('inha_day', 'open', 1);
    }
  });

  // 쿠키에 따른 상태 유지
  let inha_day = getCookie('inha_day');
  if (inha_day == 'close') {
    helpListNotice.removeClass(helpListNoticeActive);
    topBannerCheck.attr('checked', true);
  } else {
    wrap.addClass(wrapMgTop);
  }

  // 상단 배너 슬라이드 열기/닫기
  helpListNotice.click(function () {
    wrap.toggleClass(wrapMgTop);
    $(this).toggleClass(helpListNoticeActive);
  });

  // 스크롤 시 헤더 고정
  let headerMainTop = $('.header-main').offset().top;

  $(window).scroll(function () {
    let winScrTop = $(window).scrollTop();
    if (winScrTop >= headerMainTop) {
      $('.header-main').addClass('header-main--fixed');
    } else {
      $('.header-main').removeClass('header-main--fixed');
    }
  });

  // lang-list 열기/닫기
  const btnLang = $('.btn-lang');
  const langList = $('.lang-list');

  btnLang.click(function () {
    langList.stop().slideDown();
  });
  btnLang.parent().mouseleave(function () {
    langList.stop().slideUp();
  });

  // search-form 열기/닫기
  const helpListSrch = $('.help-list__search');
  const srchTxt = $('.search-txt');
  const srchForm = $('#search-form');
  const srchClose = $('.search-close');

  helpListSrch.click(function () {
    srchTxt.val('');
    srchForm.stop().slideDown(200);
  });
  srchClose.click(function () {
    srchForm.stop().slideUp(200);
  });

  // 공백 검색 시 모달창 띄우기
  const srchSubmit = $('.search-submit');
  const modalSrch = $('.modal-srch');

  srchSubmit.click(function () {
    if (srchTxt.val() == '') {
      modalSrch.show();
      return false;
    } else {}
  });

  // 검색 모달창 닫기
  const modalSrchClose = $('.modal-srch-box i, button');
  const modalSrchBox = $('.modal-srch-box');

  modalSrchClose.click(function () {
    modalSrch.hide();
  });
  modalSrch.click(function () {
    modalSrch.hide();
  });
  modalSrchBox.click(function (event) {
    event.stopPropagation();
  });

  // Go-top
  const goTop = $('.go-top');

  goTop.click(function () {
    $('html, body').stop().animate({
      scrollTop: 0
    }, 400);
  });

  // 사이드 메뉴
  const sideMenuBtns = $('.side-menu-list button');
  const sideMenuPos = [
    0,
    $('.notice').offset().top,
    $('.sanhak').offset().top,
    $('.service').offset().top,
    $('.sns').offset().top
  ];
  // 위치값이 실수일 시 반올림
  for (let i = 0; i < sideMenuPos.length; i++) {
    sideMenuPos[i] = Math.round(sideMenuPos[i]);
  }

  // 사이드 메뉴 클릭 시 해당 위치로 이동
  let sideMenuAct = 'scroll';
  const sideMenuBtnFocus = 'side-menu__btn--focused';

  $.each(sideMenuBtns, function (index) {
    $(this).click(function () {
      sideMenuAct = 'click';
      sideMenuBtns.removeClass(sideMenuBtnFocus);
      $('html, body').stop().animate({
        scrollTop: sideMenuPos[index]
      }, 400, function () {
        sideMenuBtns.eq(index).addClass(sideMenuBtnFocus);
        sideMenuAct = 'scroll';
      });
    });
  });

  // 사이드 메뉴 버튼 포커스 변경
  const sideMenuBtnsLastIndex = sideMenuBtns.length - 1;
  const TopBannerHeight = $('.top-banner').outerHeight();

  $(window).scroll(function () {
    if (sideMenuAct == 'click') return false;
    let winScrTop = $(window).scrollTop();

    sideMenuBtns.removeClass(sideMenuBtnFocus);
    for (let i = sideMenuBtnsLastIndex; i >= 0; i--) {
      // 상단 배너 슬라이드 상태에 따라 기준 높이 다르게 처리
      if (helpListNotice.hasClass(helpListNoticeActive)) {
        if (winScrTop >= sideMenuPos[i]) {
          sideMenuBtns.eq(i).addClass(sideMenuBtnFocus);
          break;
        }
      } else {
        if (winScrTop + TopBannerHeight >= sideMenuPos[i]) {
          sideMenuBtns.eq(i).addClass(sideMenuBtnFocus);
          break;
        }
      }
    }
  });

  // 메인 슬라이드
  new Swiper('.sw-main', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    allowTouchMove: false,
    pagination: {
      el: '.sw-main__pg',
      clickable: true,
    },
  });

  // 메인 슬라이드 autoplay 재생/중지
  const swMainBtn = $('.sw-main__btn');
  const swMainBtnPlay = 'sw-main__btn--play';

  swMainBtn.click(function () {
    $(this).toggleClass(swMainBtnPlay);
    let temp = $(this).hasClass(swMainBtnPlay);
    if (temp == true) {
      sw_main.autoplay.stop();
    } else {
      sw_main.autoplay.start();
    }
  });

  // 공지사항
  let notice_data_1 = [{
      title: '2021년 8월 온라인 학위수여식 안내',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '2021-2학기 재학생 등록 및 부분(학점)등록 안내',
      date: '2021.07.30.',
      page: '#'
    },
    {
      title: '[학생지원팀] 코로나19 수도권(인천) 거리두기 4단계 격상에 따른 교내시설이용 지침 안내',
      date: '2021.07.09.',
      page: '#'
    },
    {
      title: '조교/사무보조원 채용 공고',
      date: '2020.11.11.',
      page: '#'
    },
    {
      title: '[학부-국가근로] 2021학년도 2학기 국가근로 장학생 희망근로기관 신청 안내',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '2021 공사장 가림막 디자인 공모전',
      date: '2021.08.11.',
      page: '#'
    }
  ];

  let notice_data_2 = [{
      title: '[학생지원팀] 코로나19 수도권(인천) 거리두기 4단계 격상에 따른 교내시설이용 지침 안내',
      date: '2021.07.09.',
      page: '#'
    },
    {
      title: '[학생지원팀] 코로나19 거리두기 개편안에 따른 실외체육시설이용 안내',
      date: '2021.06.30.',
      page: '#'
    },
    {
      title: '[국제지원팀]코로나 19 관련 외국인 유학생 개인 방역 수칙 안내',
      date: '2021.06.30.',
      page: '#'
    },
    {
      title: '2021학년도 1학기 기말고사 운영 방식 안내',
      date: '2021.05.21.',
      page: '#'
    },
    {
      title: '2021학년도 1학기 기말고사 응시 가이드라인 안내',
      date: '2021.05.21.',
      page: '#'
    },
    {
      title: '[교무처] 2021-1학기 중간고사 부정행위 관련 당부',
      date: '2021.04.14.',
      page: '#'
    }
  ];

  let notice_data_3 = [{
      title: '2021년 8월 온라인 학위수여식 안내',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '2021-2학기 재학생 등록 및 부분(학점)등록 안내',
      date: '2021.07.30.',
      page: '#'
    },
    {
      title: '2022년 2월 조기졸업 신청 안내',
      date: '2020.08.11.',
      page: '#'
    },
    {
      title: '[미래자동차 사업단] 미래자동차공학 융합전공/마이크로전공 설명회 및 신청 방법 안내',
      date: '2021.08.10.',
      page: '#'
    },
    {
      title: '[졸준학] 2021년 8월 온라인 학위수여식 학사복 대여 안내',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '2021년 8월 수료예정자의 부분수강등록 신청 안내',
      date: '2021.08.09.',
      page: '#'
    }
  ];

  let notice_data_4 = [{
      title: '[학부-국가근로] 2021학년도 2학기 국가근로 장학생 희망근로기관 신청 안내',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '2021학년도 2학기 가송재단 장학생 선발 공고',
      date: '2021.08.03.',
      page: '#'
    },
    {
      title: '[창업지원단] 창업 꿈나무 장학금 신청안내 (대학원)',
      date: '2021.07.30.',
      page: '#'
    },
    {
      title: '[창업지원단] 창업 꿈나무 장학금 신청안내 (학부)',
      date: '2021.07.30.',
      page: '#'
    },
    {
      title: '2021년 2학기 한국장학재단 푸른등대 기부장학사업 신규장학생 선발 안내',
      date: '2021.07.12.',
      page: '#'
    },
    {
      title: '',
      date: '',
      page: '#'
    }
  ];

  let notice_data_5 = [{
      title: '[평생교육원] 인천시민대학(인하 라이프디자인 스쿨2) 교육생 모집',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '[INSTAR] (BK21대학원혁신)\'정보·보안 교육 - 박찬암 대표 초청 특강(8/20)\' 안내',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '[교수학습개발센터] 2021학년도 2학기 교수법 워크숍 신청 안내',
      date: '2021.08.04.',
      page: '#'
    },
    {
      title: '[인하대 다문화융합연구소] 2021년 ICME (다문화교육 국제학술대회) 개최 안내',
      date: '2021.08.03.',
      page: '#'
    },
    {
      title: '[인공지능융합연구센터] 클라우드 기반 인공지능/빅데이터 교육 플랫폼 활용 세미나 안내 (8/18)',
      date: '2021.07.28.',
      page: '#'
    },
    {
      title: '[학생상담실] 대학혁신지원사업 - 인하인 마음보기 프로그램(온라인 심리검사) 안내',
      date: '2021.07.15.',
      page: '#'
    }
  ];

  let notice_data_6 = [{
      title: '조교/사무보조원 채용 공고',
      date: '2020.11.11.',
      page: '#'
    },
    {
      title: '[미래자동차 사업단] \'미래자동차공학\' 융합전공/마이크로전공 설명회 안내',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '[지속가능한 에너지부품소재 핵심연구지원센터] 연구원 채용',
      date: '2020.08.11.',
      page: '#'
    },
    {
      title: '미디어커뮤니케이션학과TA1 대학원생 1명(어문 인문 사범 사회계열)',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '인하대학교 IPP듀얼공동훈련센터 연구원 채용',
      date: '2021.08.10.',
      page: '#'
    },
    {
      title: '[의류디자인학과] 2021-2학기 조교(LA1) 모집 공고',
      date: '2021.08.10.',
      page: '#'
    }
  ];

  let notice_data_7 = [{
      title: '2021 공사장 가림막 디자인 공모전',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '2남관/6호관 옥상 LG유플러스 2G장비 철거 안내(8.10(화))',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '학생의료공제회 2021학년도 1학기(2021.03.01~2021.08.31) 접수 마감안내',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '교내 전체 정전 안내(8월 15일) 재공고',
      date: '2021.08.04.',
      page: '#'
    },
    {
      title: '2021 공과대학 학과홍보 동영상 공모전 수상작 안내',
      date: '2021.07.28.',
      page: '#'
    },
    {
      title: '소방시설물 작동기능점검 실시 안내',
      date: '2021.07.26.',
      page: '#'
    }
  ];

  let bid_data = [{
      title: '[입찰 재공고] 인하대학교 항공우주융합캠퍼스 내 편의시설(카페) 운영업체 선정',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '[입찰 재공고] 인하대학교 항공우주융합캠퍼스 내 편의시설(매점) 운영업체 선정',
      date: '2021.08.11.',
      page: '#'
    },
    {
      title: '[공개구매 재공고] 4차산업혁명을 대비한 학사행정서비스 프로그램 구축 및 운영 업체 선정',
      date: '2021.08.11',
      page: '#'
    },
    {
      title: '[입찰 재공고] 행운의 열쇠 구매',
      date: '2021.08.09.',
      page: '#'
    },
    {
      title: '[입찰] 배터리 테스터기 구매',
      date: '2021.08.05.',
      page: '#'
    },
    {
      title: '[입찰] 형광분광기 구매',
      date: '2021.08.05',
      page: '#'
    },
  ];

  // 공지사항 데이터 배열
  let noticeDataArr = [
    notice_data_1,
    notice_data_2,
    notice_data_3,
    notice_data_4,
    notice_data_5,
    notice_data_6,
    notice_data_7,
  ];

  // 공지사항 데이터 전달
  const noticeDataDiv = $('.notice-data .notice-box');
  const bidDataDiv = $('.bid-data .notice-box');

  function sort_data(_where, _obj) {
    $.each(_where, function (index) {
      let tempData = _obj[index];
      let tempTit = $(this).find('.notice-link__tit');
      let tempDate = $(this).find('.notice-link__date');
      let tempLink = $(this).find('.notice-link');

      tempTit.text(tempData.title);
      tempDate.text(tempData.date);
      tempLink.attr('href', tempData.page);
    });
  }

  sort_data(noticeDataDiv, notice_data_1);
  sort_data(bidDataDiv, bid_data);

  // 공지사항/입찰공고 탭메뉴 이동
  const noticeTit = $('.notice__tit');
  const noticeCont = $('.notice-cont');
  const noticeTitFocus = 'notice__tit--focused';

  $.each(noticeTit, function (index) {
    $(this).click(function (event) {
      event.preventDefault();
      noticeCont.hide();
      noticeCont.eq(index).show();

      noticeTit.removeClass(noticeTitFocus);
      $(this).addClass(noticeTitFocus);
    });
  });

  // 공지사항 카테고리 이동
  const noticeCate = $('.notice__menu-list a');
  const noticeMenuItemFocus = 'notice__menu-item--focused';

  $.each(noticeCate, function (index) {
    $(this).click(function (event) {
      event.preventDefault();
      sort_data(noticeDataDiv, noticeDataArr[index]);

      noticeCate.removeClass(noticeMenuItemFocus);
      $(this).addClass(noticeMenuItemFocus);
    });
  });

  // 배너 슬라이드
  new Swiper('.sw-banner', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    allowTouchMove: false,
    navigation: {
      prevEl: '.sw-banner__prev',
      nextEl: '.sw-banner__next',
    },
  });

  // 행사/세미나 슬라이드
  new Swiper('.sw-seminar', {
    loop: true,
    allowTouchMove: false,
    speed: 1000,
    navigation: {
      prevEl: '.sw-seminar__prev',
      nextEl: '.sw-seminar__next',
    },
  });

  // 산학협력단 슬라이드
  new Swiper('.sw-sanhak-news', {
    loop: true,
    allowTouchMove: false,
    speed: 1000,
    navigation: {
      prevEl: '.sw-sanhak-news__prev',
      nextEl: '.sw-sanhak-news__next',
    },
  });

  // sitemap 열기/닫기
  const sitemapTop = $('.sitemap-top');
  const sitemapMain = $('.sitemap-main');

  sitemapTop.click(function () {
    sitemapMain.stop().slideToggle(300);
  })
}