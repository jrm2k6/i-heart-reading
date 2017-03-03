<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>I &hearts; Reading</title>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="{{ elixir('css/landing.css') }}" rel="stylesheet">
</head>
<body>
  <section>
    <div class='landing-header-container'>
      <div class='landing-header-container-background-img'>
        <img src='/images/stacked-books-min.png' />
      </div>
      <div class='landing-header'>
        <div class='landing-header-logo'>
          <img class='landing-header-logo-img' src='/images/logos/i-heart-reading-logo.png' />
        </div>
        <div class='landing-header-menu'>
          <div><a class='top-menu-item' href='/login'>Log in</a></div>
          <div><a class='top-menu-item' href='mailto:jeremy.dagorn@gmail.com?Subject=Hello!'>contact</a></div>
        </div>
      </div>
      <div class='landing-header-main-explanation-text-container'>
        <hr class='landing-header-separator' />
        <div class='landing-header-main-explanation-text'>
          No more spreadsheets to see what books your students are reading. No more folders to store reviews of their books.<br />
          An easy to use platform for you and your students. Just a click away.
        </div>
      </div>
      <div class='landing-header-learn-more-button-container'>
        <a class='landing-header-learn-more-button' href='#features-section'>Learn More</a>
      </div>
      <div class='landing-header-motto-container'>
        Help your students improve their reading, and have fun while doing it.
      </div>
    </div>
  </section>
  <section>
    <div class='landing-first-section'>
      <div class='landing-first-section-title'>
        A simple dashboard for all.
      </div>
      <div class='dots'>
        <div class='dot dot-clicked' data-img='/images/teacher-dashboard.png'></div>
        <div class='dot' data-img='/images/teacher-reviews.png'></div>
        <div class='dot' data-img='/images/student-profile.png'></div>
        <div class='dot' data-img='/images/students-books.png'></div>
        <div class='dot' data-img='/images/student-editor-done.png'></div>
      </div>
      <div class='landing-first-section-mac-placeholder'>
        <img id='mac-placeholder' src='/images/teacher-dashboard.png'>
      </div>
    </div>
  </section>
  <section>
    <div class='landing-second-section'>
      <div class='landing-second-section-content'>
        <div class='landing-second-section-title'>
          Ready for a new chapter?
        </div>
        <hr class='landing-second-section-thick-separator' />
        <div class='get-started-container'>
          <input id='get-started-input' class='get-started-input' type='email' placeholder='Enter your email'/>
          <button id='get-started-button'>Get Started</button>
        </div>
        <div class='alert-container'>
          <span class='success-alert'> Thanks! We will be in touch soon!</span>
          <span class='support-alert'> Oops, something happened on our side! Please contact our support team!</span>
        </div>
      </div>
      <div class='landing-second-section-background-img'>
        <img src='/images/pen-in-book-min.png' />
      </div>
    </div>
  </section>
  <section>
    <div class='landing-third-section' id='features-section'>
      <div class='landing-third-section-titles-container'>
        <div class='landing-third-section-title'>
          Features
        </div>
        <hr class='landing-third-section-thin-gray-separator' />
      </div>
      <div class='landing-third-section-features-container'>
        <div class='feature-item with-bottom-border with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/education.svg' />
          <div class='feature-item-title'>Build habits</div>
          <div class='feature-item-description'>Make reading fun, not a chore.</div>
        </div>
        <div class='feature-item with-bottom-border with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/user-group.svg' />
          <div class='feature-item-title'>Group management</div>
          <div class='feature-item-description'>One platform, multiple classrooms</div>
        </div>
        <div class='feature-item with-bottom-border'>
          <img class='feature-item-icon' src='/images/svgs/mood-happy.svg' />
          <div class='feature-item-title'>Simplicity</div>
          <div class='feature-item-description'>Intuitive and hassle free</div>
        </div>
        <div class='feature-item with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/trophy.svg' />
          <div class='feature-item-title'>Challenges</div>
          <div class='feature-item-description'>Help your students reach their objectives</div>
        </div>
        <div class='feature-item with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/time.svg' />
          <div class='feature-item-title'>Save Time</div>
          <div class='feature-item-description'>Manage all your students in one place</div>
        </div>
        <div class='feature-item'>
          <img class='feature-item-icon' src='/images/svgs/pen-tool.svg' />
          <div class='feature-item-title'>Editing tools</div>
          <div class='feature-item-description'>Write, edit, submit, review</div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class='footer'>
      <div class='footer-background-img'>
        <img src='/images/desk-screen-min.png' />
      </div>
      <div class='footer-content'>
        <div class='left-section-footer'>
          <a class='contact' href="mailto:jeremy.dagorn@gmail.com?Subject=Hello!">Contact</a>
        </div>
        <div class='right-section-footer'>
          Made with <span class='heart'>&hearts;</span> in San Diego.
        </div>
      </div>
    </div>
  </section>
</body>
<script>
  (function() {
    // var csrfToken = null;
    // [].forEach.call(document.getElementsByTagName('meta'), function(metaElement) { if (metaElement.name === 'csrf-token') {
    //   csrfToken = metaElement.content;
    // }

    var imgPlaceholder = document.getElementById('mac-placeholder');
    var dotsClassName = 'dot';
    var dotsElements = document.getElementsByClassName(dotsClassName);

    var updatePictureShown = function(event) {
      var dotClicked = event.target;
      var imgToSwitchTo = dotClicked.dataset.img;
      imgPlaceholder.src = imgToSwitchTo;

      for (var i = 0; i < dotsElements.length; i++) {
          dotsElements[i].className = 'dot';
      }

      dotClicked.className += ' dot-clicked';
    }

    var addBehaviorToDots = function() {
      [].forEach.call(dotsElements, function(dotElement) {
        dotElement.addEventListener('click', updatePictureShown, false);
      });
    }

    var sendEmailAddress = function(email) {
        $.ajax({
          method: 'POST',
          url: '/send-email',
          data: {
            email: email
          },
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: 'json'
        }).done(function() {
            $('.success-alert').addClass('showing');
          }).fail(function() {
            $('.support-alert').addClass('showing');
          });
    }

    var showValidationError = function() {
      document.getElementById('get-started-input').className = 'get-started-input empty';
    }

    var addGetStartedClickHandler = function() {
      document.getElementById('get-started-button').addEventListener('click', function(e) {
        var emailInput = document.getElementById('get-started-input').value;

        if (emailInput.value !== '') {
          sendEmailAddress(emailInput);
        } else {
          showValidationError();
        }
      });
    }


    addGetStartedClickHandler();
    addBehaviorToDots();
  }())
</script>
</html>
