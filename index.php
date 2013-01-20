<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
  <meta charset="UTF-8" />
  <title>Responsive preview</title>
  <link rel="stylesheet" href="css/global.css">
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="js/responsize.js"></script>
</head>
  <body>
    <article id="viewport">
      <iframe src="<?php echo isset($_GET["url"]) ? 'http://' . $_GET['url'] : 'http://trentwalton.com'; ?>"></iframe>
    </article>
    <script>
      $(function() {
        $("#viewport").responsize();
      });
    </script>
  </body>
</html>