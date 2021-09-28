$(document).ready(function () {
  // top-banner__check
  $('.top-banner__close').click(function() {
    $('.wrap').toggleClass('wrap--mt-0');
    $('.help-list__notice').toggleClass('help-list__notice--active');
  });

  // 상단 배너 슬라이드 닫기
  $('.help-list__notice').click(function () {
    $('.wrap').toggleClass('wrap--mt-0');
    $(this).toggleClass('help-list__notice--active');
  });

  var sw_top_banner = new Swiper('.sw-top-banner', {
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
    }
  });

  // lang-list
  $('.btn-lang').click(function () {
    $('.lang-list').stop().slideDown();
  });
  $('.btn-lang').parent().mouseleave(function () {
    $('.lang-list').stop().slideUp();
  });

  // search open & close
  $('.help-list__search').click(function () {
    $('.search-txt').val('');
    $('#search-form').stop().slideDown(200);
  });
  $('.search-close').click(function () {
    $('#search-form').stop().slideUp(200);
  });

  // 공백 검색 시 모달 
  $('.search-submit').click(function () {
    if ($('.search-txt').val() == '') {
      $('.modal-srch').show();
      return false;
    } else {}
  });

  // search modal close
  $('.modal-srch-box i, button').click(function () {
    $('.modal-srch').hide();
  });
  $('.modal-srch').click(function () {
    $('.modal-srch').hide();
  });
  $('.modal-srch-box').click(function (event) {
    event.stopPropagation();
  });

  // Go-top
  $('.go-top').click(function () {
    $('html, body').stop().animate({
      scrollTop: 0
    }, 400);
  });

  // 우측고정메뉴
  const fixMenuIcons = $('.fixed-menu-list button');
  const fixMenuPos = [
    0,
    $('.notice').offset().top,
    $('.sanhak').offset().top,
    $('.service').offset().top,
    $('.sns').offset().top
  ];

  // 위치값이 실수일 시 반올림
  for (let i = 0; i < fixMenuPos.length; i++) {
    fixMenuPos[i] = Math.round(fixMenuPos[i]);
  }

  // 우측고정메뉴 클릭 시 해당 위치로 이동
  let fixMenuAct = 'scroll';

  $.each(fixMenuIcons, function (index) {
    $(this).click(function () {
      fixMenuAct = 'click';
      fixMenuIcons.removeClass('fixed-menu__icon--focused');
      $('html, body').stop().animate({
        scrollTop: fixMenuPos[index]
      }, 400, function () {
        fixMenuIcons.eq(index).addClass('fixed-menu__icon--focused');
        fixMenuAct = 'scroll';
      });
    });
  });

  const fixMenuIconsLastIndex = fixMenuIcons.length - 1;

  $(window).scroll(function () {
    // 스크롤 위치에 따른 우측고정메뉴 포커스 이동
    if (fixMenuAct == 'click') return;

    let winScrTop = $(window).scrollTop();

    fixMenuIcons.removeClass('fixed-menu__icon--focused');

    for (let i = fixMenuIconsLastIndex; i >= 0; i--) {
      if (winScrTop >= fixMenuPos[i]) {
        fixMenuIcons.eq(i).addClass('fixed-menu__icon--focused');
        break;
      }
    }
  });

  var sw_main = new Swiper('.sw-main', {
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

  $('.sw-main__btn').click(function () {
    $(this).toggleClass('sw-main__btn--play');
    var temp = $(this).hasClass('sw-main__btn--play');
    if (temp == true) {
      sw_main.autoplay.stop();
    } else {
      sw_main.autoplay.start();
    }
  });

  var sw_banner = new Swiper('.sw-banner', {
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

  var sw_seminar = new Swiper('.sw-seminar', {
    loop: true,
    allowTouchMove: false,
    speed: 1000,
    navigation: {
      prevEl: '.sw-seminar__prev',
      nextEl: '.sw-seminar__next',
    },
  });

  var sw_sanhak_news = new Swiper('.sw-sanhak-news', {
    loop: true,
    allowTouchMove: false,
    speed: 1000,
    navigation: {
      prevEl: '.sw-sanhak-news__prev',
      nextEl: '.sw-sanhak-news__next',
    },
  });

  var notice_data_div = $('.notice-data .notice-box');
  var bid_data_div = $('.bid-data .notice-box');
  var notice_cate = $('.notice__menu-list a');

  var notice_data_1 = [{
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

  var notice_data_2 = [{
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

  var notice_data_3 = [{
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

  var notice_data_4 = [{
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

  var notice_data_5 = [{
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

  var notice_data_6 = [{
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

  var notice_data_7 = [{
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

  var bid_data = [{
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

  var notice_data_arr = [
    notice_data_1,
    notice_data_2,
    notice_data_3,
    notice_data_4,
    notice_data_5,
    notice_data_6,
    notice_data_7,
  ];

  function sort_data(_where, _obj) {
    $.each(_where, function (index, item) {
      var temp_data = _obj[index];

      var temp_tit = $(this).find('.notice-link__tit');
      temp_tit.text(temp_data.title);


      var temp_date = $(this).find('.notice-link__date');
      temp_date.text(temp_data.date);

      var temp_link = $(this).find('.notice-link');
      temp_link.attr('href', temp_data.page);
    });
  }

  $.each(notice_cate, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      sort_data(notice_data_div, notice_data_arr[index]);

      notice_cate.removeClass('notice__menu-item--focused');
      $(this).addClass('notice__menu-item--focused');
    });
  });

  sort_data(notice_data_div, notice_data_1);
  sort_data(bid_data_div, bid_data);

  var notice_tit = $('.notice__tit');
  var notice_cont = $('.notice-cont');
  $.each(notice_tit, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      notice_cont.hide();
      notice_cont.eq(index).show();

      notice_tit.removeClass('notice__tit--focused');
      $(this).addClass('notice__tit--focused');
    });
  });

  // sitemap
  $('.sitemap-top').click(function () {
    $('.sitemap-main').stop().slideToggle(300);
  })
});

window.onload = function () {

}