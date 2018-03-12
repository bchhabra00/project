$(function () {
    
    var socket = io.connect('/');

    $('#status').hide();
    $('#chatwrap').hide();

    $('#send').click(function(e){
        e.preventDefault();
      if($('#messagebox').val() != ""){
          socket.emit('chat message', $('#messagebox').val());
          $('#messagebox').val('');
          return false;  
        }
      else{
             $('#warning').css("transition", "1s");
             $('#warning').show();
              $("#warning").delay(2000).hide(0);
        }
     
    });

    $('#clear').click(function(e){
      e.preventDefault();
     $('#messages li:not(:first)').remove();
    });

    $('#warning').mouseover(function(e){
      $('.typewarning').show();
    });

    $('#warning').mouseout(function(e){
      $('.typewarning').hide();
    });

    var username;

    
    socket.on('userfacebook', function(data){
      console.log(data);
   });
   
      
      $('#usernameform').submit(function(){ 
      
    
       if($('#username').val() !=='' ){
          socket.emit('username', $('#username').val());
      
          username = $('#username').val();
          $('#messages').html("");
          $('#username').val('');
          $('.username').hide();
          $('#messages').show();
          $('#chatwrap').show();
          $('#partition2').show();
          $('#logo').hide();
          return false;   
       }

       else{
  
        alert("Please enter any username to enter the chat");
     }
      


     $('#messagebox').keypress(function(){
      
      socket.emit('typing', $('#username').val());
    });
 

    });
    socket.on('chat message', function(username,msg){
      $('#messages').append($('<li>' + '<b>' + username + '</b>' + ": " + msg + '</li>'));
    });

    socket.on('private_request_received', function(sender,msg){
      $('#messages').append($('<li>' + '<a class="joined-room-link" href="/drawing">' + sender + msg + '</a>' + '</li>'));
      $('.joined-room-link').click(function(event){
        console.log('link clicked');
        socket.emit('joined room',username,sender);
      });
    });
    socket.on('typing', function(data){

      $('#typing').html('<p><em>' + data + '&nbsp' + "is typing..." + '</em></p>');
      });
    socket.on('join drawing',function(username){
      $('#messages').append($('<li>' + '<a class="joined-room-link" href="/drawing">' + username + ' has joined drawing already, join him ' + '</a>' + '</li>'));

    });

    socket.on('userfacebook', function(data){
      // $('#name').html(data)
      console.log(data);
    });

    socket.on('username', function(msg){
      $('#messages').append($('<li>').text(msg));
      $('#messages').show();
    });

     socket.on('guest connected', function(msg){
      $('#messages').append($('<li style="background-color: rgba(85, 204, 44,0.8);">').text(msg));
      $('#messages').show();
    });

      socket.on('guest disconnected', function(msg){
      $('#messages').append($('<li style="background-color: rgba(250, 87, 68 ,1);">').text(msg));
    });
    

    socket.on('allusers', function(names){
      $('#allusers').html("");
      for (var i=0; i<names.length; i++){
        var ul=document.createElement('ul');
       document.getElementById('allusers').appendChild(ul);
        var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML= names[i];
        li.addEventListener('click',function(element){
          console.log(element.target.outerText);
          if(username!=element.target.outerText){
            socket.emit('private_request', username, element.target.outerText);
            alert("Drawing request sent to " + element.target.outerText);
          }
          else{
            alert("Cant request yourself!");
          }
        });
    }
    });


});