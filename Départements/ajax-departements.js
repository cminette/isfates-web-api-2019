function makeDepartmentOptionFor(nom,numero) {

    if(nom == "" && numero == "") 
        return '<option value=""></option>' ;

    return '<option value="' + numero + '"> ' + nom + ' (' + numero +')</option>' ;
}

function makeCityOptionFor(nom) {
    return '<option value="' + nom + '"> ' + nom + '</option>' ;
}

function showProgress() {
    $('#spinner').show();
    displayMessage('Loading ...')
}

function hideProgress() {
    $('#message').empty();
    $('#spinner').hide();
}

function displayMessage(text) {
    $('#message').empty();
    $('#message').html("<i> " + text + " </i>");
}


function populateDepartments() {    
    var Department = $('#departement');

    $.ajax({
        method: "GET",
        url: "http://www.cyril-minette.net/iut/javascript/webservices/ws_departements.php",
        dataType: "xml",
        beforeSend: showProgress()
    }).done(function(data) {        
        Department.empty();
        Department.append(makeDepartmentOptionFor("",""));
        
        $(data).find('departement').each(function () {
            var numero = $(this).find("numero").text();
            var nom = $(this).find("nom").text();            
            Department.append(makeDepartmentOptionFor(nom,numero));
        })

        hideProgress();
        Department.chosen();        

    }).fail(function() {
        displayMessage("oups !");
    })
}

function populateCities(){

    var ville = $('#ville');
    var Department = $('#departement').val();

    if(Department != undefined) {
        $.ajax({
            method: "GET",
            url: "https://www.cyril-minette.net/iut/javascript/webservices/ws_villes_par_departement.php",
            data: { "departement": Department },
            dataType: "xml",
            beforeSend: showProgress()
        }).done(function(data) {        
            ville.empty();        
            ville.append(makeCityOptionFor(""));            
            $(data).find('ville').each(function () {                
                var nom = $(this).text();            
                ville.append(makeCityOptionFor(nom));                
            })
            hideProgress();
            $('#ville').show();
            ville.chosen();
        }).fail(function() {
            displayMessage("oups !");
        })
    }
}

$(document).ready( function() {
    populateDepartments();
    $('#departement').change(function() {
        populateCities();        
    });
    $('#ville').hide();    
});
