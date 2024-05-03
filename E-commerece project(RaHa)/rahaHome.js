

  function submitmail() {
        var userEmail = document.getElementById("userEmail").value;
        if(userEmail !== "") {
          document.getElementById("submitMessage").style.display = "block";
          document.getElementById("userEmail").value=" "
        }
        setTimeout(function() {
          submitMessage.style.display = "none";
        }, 2000);
      }