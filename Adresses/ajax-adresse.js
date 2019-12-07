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
    $('#adresse').keyup(function() {
        var text = $(this).val();
        
        if(text.length > 3) {
            $.ajax({
                method: "GET",
                url: "https://api-adresse.data.gouv.fr/search/",
                data: { "q": text },
                dataType: "json",
                beforeSend: displayMessage("Veuillez patienter un instant ...")                    
            }).done(function(data) {
                $('#resultats').empty();
                if(data.features.length > 0) {

                    $('#resultats').append("<table class='table'>");
                    $('#resultats table').html("<tr><th>Adresse</th><th>CP</th><th>Ville</th></tr>");

                    $.each(data.features, function(i, item) {
                        var nom = item.properties.name ;
                        var cp = item.properties.postcode ;
                        var ville = item.properties.city ;

                        $('#resultats table tr:last').after(addLine(nom, cp, ville));
                    });
                } else {
                    displayMessage("Il n'y a pas de résultat");
                }
            }).fail(function(){
                displayMessage("Nous avons rencontré une erreur");
            });
        }
    });
});