<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../Script/facture.js"></script>
    <!-- <link rel="stylesheet" href="../Style/all.css"> -->
    <!-- <link rel="stylesheet" href="../Style/dashboard.css"> -->
    <title>Facture</title>
</head>
<body>
    <div id="pdf-content">
      <p style="color: tomato;">Convert this text to PDF.</p>
      <div class="logo">
          <img src="../Media/Images/logo.png" alt="">
      </div>
      <!-- <table>
          <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Age</th>
          </tr>
          <td>
              <th>Ahmed</th>
              <th>Slimani</th>
              <th>30</th>
          </td>
          <td>
              <th>Ahmed</th>
              <th>Slimani</th>
              <th>30</th>
          </td>
      </table> -->
    </div>
    <div class="footer">
        <button onclick="savePdfPage()" id="save-btn">Save PDF</button>
    </div>
</body>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    body{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-items: center;
    }
    .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #save-btn{
        width: fit-content;
        height: 40px;
        padding: 10px;
        border: 3px solid tomato;
        text-decoration: none;
        background-color: transparent;
        border-radius: 20px;
        cursor: pointer;
    }
    #save-btn:hover{
        background-color: tomato;

    }
    .logo{
        max-width: 50px;
        height: 50px;
    }
    .logo img{
        width: 100px;
        height: fit-content;
    }
</style>
</html>

