<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>I &hearts; Reading</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Styles -->
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
          <div>Log in</div>
          <div>contact</div>
        </div>
      </div>
      <div class='landing-header-main-explanation-text-container'>
        <hr class='landing-header-separator' />
        <div class='landing-header-main-explanation-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non varius nisl, eget porttitor lacus. Maecenas placerat elit sed lobortis posuere. Suspendisse augue sapien, tempus mattis consequat et, rhoncus id est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean sed ex varius, porttitor tellus.
        </div>
      </div>
      <div class='landing-header-learn-more-button-container'>
        <a class='landing-header-learn-more-button' href='#'>Learn More</a>
      </div>
      <div class='landing-header-motto-container'>
        I Heart Reading is Awesome
      </div>
    </div>
  </section>
  <section>
    <div class='landing-first-section'>
      <div class='landing-first-section-title'>
        CREATE YOUR BOARD
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
      <div class='landing-second-section-background-img'>
        <img src='/images/pen-in-book-min.png' />
      </div>
      <div class='landing-second-section-title'>
        Delivering quality education
      </div>
      <hr class='landing-second-section-thick-separator' />
      <a href='#' class='get-started-button'>Get Started</a>
    </div>
  </section>
  <section>
    <div class='landing-third-section'>
      <div class='landing-third-section-titles-container'>
        <div class='landing-third-section-title'>
          Features
        </div>
        <div class='landing-third-section-subtitle'>
            Lorem ipsum dolor sit amet proin gravida nibh vel velit
        </div>
        <hr class='landing-third-section-thin-gray-separator' />
      </div>
      <div class='landing-third-section-features-container'>
        <div class='feature-item with-bottom-border with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/education.svg' />
          <div class='feature-item-title'>Title 1</div>
          <div class='feature-item-description'>Lorem ipsum dolor sit amet proin gravida nibh vel velit</div>
        </div>
        <div class='feature-item with-bottom-border with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/user-group.svg' />
          <div class='feature-item-title'>Title 2</div>
          <div class='feature-item-description'>Lorem ipsum dolor sit amet proin gravida nibh vel velit</div>
        </div>
        <div class='feature-item with-bottom-border'>
          <img class='feature-item-icon' src='/images/svgs/mood-happy.svg' />
          <div class='feature-item-title'>Title 3</div>
          <div class='feature-item-description'>Lorem ipsum dolor sit amet proin gravida nibh vel velit</div>
        </div>
        <div class='feature-item with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/trophy.svg' />
          <div class='feature-item-title'>Title 4</div>
          <div class='feature-item-description'>Lorem ipsum dolor sit amet proin gravida nibh vel velit</div>
        </div>
        <div class='feature-item with-right-border'>
          <img class='feature-item-icon' src='/images/svgs/time.svg' />
          <div class='feature-item-title'>Title 5</div>
          <div class='feature-item-description'>Lorem ipsum dolor sit amet proin gravida nibh vel velit</div>
        </div>
        <div class='feature-item'>
          <img class='feature-item-icon' src='/images/svgs/pen-tool.svg' />
          <div class='feature-item-title'>Title 6</div>
          <div class='feature-item-description'>Lorem ipsum dolor sit amet proin gravida nibh vel velit</div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class='footer'>
      <div class='footer-background-img'>
        <img src='/images/desk-screen-min.png' />
      </div>
      <div>
        Made with <span class='heart'>&hearts;</span> in San Diego.
      </div>
    </div>
  </section>
</body>
<script>
  (function() {
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

    addBehaviorToDots();
  }())
</script>
</html>
