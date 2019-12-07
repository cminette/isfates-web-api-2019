function addCell(text) {
    return "<td>" + text + "</td>" ;
}

function addLine(nom, cp, ville) {
    return "<tr>" + addCell(nom) + addCell(cp) + addCell(ville) + "</tr>";
}

function displayMessage(text) {
    $('#resultats').empty();
    $('#resultats').html("<i> " + text + " </i>");
}

$(document).ready(function(){
    $('#password').keyup(function() {
        var text = $(this).val();
        
        if(text.length > 3) {
            $.ajax({
                method: "GET",
                url: "http://www.cyril-minette.net/iut/javascript/webservices/ws_json_pwd.php",
                data: { "pwd": text },
                dataType: "json",
                beforeSend: displayMessage("Veuillez patienter un instant ...")                    
            }).done(function(data) {
                $('#resultats').empty();
                if(data.length > 0) {
                    console.log(data);
                    if(data == "ok") 
                        displayMessage("Votre mdp est correct");
                    else { 
                        $('#resultats').append("<ul>");                    
                        data.forEach(element => $('#resultats').append("<li>" + element + "</li>"));
                        $('#resultats').append("</ul>");
                    }
                } else {
                    displayMessage("Il n'y a pas de résultat");
                }
            }).fail(function(){
                displayMessage("Nous avons rencontré une erreur");
            });
        }
    });
});