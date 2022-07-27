// console.log("DEBUG: gestionEmp.js");
// Submit data of new emp
function submitNewEmp(){
    let form = document.getElementById("formNewEmp");
    let listInput = document.querySelectorAll(".inputNewEmp");   
    let checkHandler = true;
    let errorStyle = "border-left: 5px solid rgb(202, 86, 65);outline:none;";
    let correctStyle = "border-left: 5px solid #45af69;outline:none;";
    // Check inputs
    listInput.forEach( input => {
        // If input is not empty
        if( input.value ){
            input.style = correctStyle;
            switch( input.getAttribute("id") ){
                // Check password
                case "new-confMotDePasseUtilisateur" : {
                    let pswd = document.getElementById("new-motDePasseUtilisateur");
                    if( pswd.value != input.value ){
                        pswd.style = errorStyle;
                        input.style = errorStyle;
                        checkHandler = false;
                    }
                }
            }            
        }
        // otherwise
        else{
            input.style = errorStyle;
            checkHandler = false;
        }
    } );

    // Submit data if all inputs are set
    if( checkHandler ){
        let nomPersonnel = form.querySelector("#new-nomPersonnel").value;
        let prenomPersonnel = form.querySelector("#new-prenomPersonnel").value;
        let NCNSSPersonnel = form.querySelector("#new-NCNSSPersonnel").value;
        let servicePersonnel = form.querySelector("#new-servicePersonnel").value;
        let dateEntrePersonnel = form.querySelector("#new-dateEntrePersonnel").value;
        let salairePersonnel = form.querySelector("#new-salairePersonnel").value;
        let portablePersonnel = form.querySelector("#new-portablePersonnel").value;
        let emailUtilisateur = form.querySelector("#new-emailUtilisateur").value;
        let motDePasseUtilisateur = form.querySelector("#new-motDePasseUtilisateur").value;
        let codeAgence = mainData.agence.codeAgence;
        let url = `../agence/ajouteEmp.php?nomPersonnel=${nomPersonnel}&prenomPersonnel=${prenomPersonnel}&NCNSSPersonnel=${NCNSSPersonnel}&servicePersonnel=${servicePersonnel}&dateEntrePersonnel=${dateEntrePersonnel}&salairePersonnel=${salairePersonnel}&portablePersonnel=${portablePersonnel}&emailUtilisateur=${emailUtilisateur}&motDePasseUtilisateur=${motDePasseUtilisateur}&codeAgence=${codeAgence}`;
        closePopUp(form.children[0]);
        // window.open(url, "_blank");
        runIFrame("submiteEmpData", url, 5);
        setTimeout(checkMainData,2000);
    }
}


// Generate employes tables
function loadEmpTable(){
    let table = document.getElementById("emp-table");
    let listEmp = mainData.agence.personnel.list;
    table.innerHTML = "";
    listEmp.forEach(emp => {if(emp.isDeletedPersonnel == '0')
        
        table.innerHTML = `
        <tr id="emp-${emp.codePersonnel}">
            <form action="updateEmp.php" method="POST" target="_blank" class="empRow">
                <td class="hidden"><input required class="empInput codePersonnel" name="codePersonnel" type="number" value="${emp.codePersonnel}"></td>
                <td><input required disabled class="empInput prenomPersonnel" placeholder="Indéterminé"  name="prenomPersonnel" type="text" value="${emp.prenomPersonnel}"></td>
                <td><input required disabled class="empInput nomPersonnel" placeholder="Indéterminé"  name="nomPersonnel" type="text" value="${emp.nomPersonnel}"></td>
                <td><input required disabled class="empInput NCNSSPersonnel" placeholder="Indéterminé"  name="NCNSSPersonnel" type="text" value="${emp.NCNSSPersonnel}"></td>
                <td>
                    <select required disabled class="empInput servicePersonnel" name="servicePersonnel">
                        <option value="agent commercial">agent commercial</option>
                        <option ${( (emp.servicePersonnel == 'administrateur') ? "selected":"" )} value="administrateur">administrateur</option>
                    </select>
                </td>
                <td><input required disabled class="empInput portablePersonnel" placeholder="Indéterminé" name="portablePersonnel" type="tel"  value="${emp.portablePersonnel}"></td>
                <td><input required disabled class="empInput dateEntrePersonnel" name="dateEntrePersonnel" type="date" value="${emp.dateEntrePersonnel}"></td>
                <td><input required disabled class="empInput salairePersonnel" placeholder="Indéterminé" name="salairePersonnel" type="text" value="${emp.salairePersonnel}"></td>
                <td class="modEmp">
                    <i class="fa-solid fa-solid-emp fa-pen-to-square" onclick="editEmp(parentNode.parentNode)" title="Modifier"></i>
                    <i class="fa-solid fa-solid-emp fa-person-circle-minus" onclick="delEmp(parentNode.parentNode)" title="Retirer"></i>
                </td>
                <td class="confEditEmp hidden">
                    <i class="fa-solid fa-solid-emp fa-check yesEditEmp" title="Confirmer"></i>
                    <i class="fa-solid fa-solid-emp fa-xmark fa-xmark-emp noEditEmp" title="Annuler"></i>
                </td>
                <td class="confRemoveEmp hidden">
                    <i class="fa-solid fa-solid-emp fa-check yesDelEmp" title="Confirmer"></i>
                    <i class="fa-solid fa-solid-emp fa-xmark fa-xmark-emp noDelEmp" title="Annuler"></i>
                </td>
            </form>
        </tr>

        ` + table.innerHTML;
    });
    table.innerHTML = `
    <tr>
        <th>Prenom</th>
        <th>Nom</th>
        <th>N° CNSS</th>
        <th>Service</th>
        <th>N° Telephone</th>
        <th>Date d'entré</th>
        <th>Salaire/mois</th>
        <th>Modifier</th>
    </tr>
    ` + table.innerHTML;
}

// Edit employe details
function editEmp(inputDiv){
    let modEmp = inputDiv.getElementsByClassName("modEmp")[0];
    let confEditEmp = inputDiv.getElementsByClassName("confEditEmp")[0];
    let noEditEmp = inputDiv.getElementsByClassName("noEditEmp")[0];
    let yesEditEmp = inputDiv.getElementsByClassName("yesEditEmp")[0];
    let codePersonnel = inputDiv.getAttribute("id").split("emp-")[1];
    let personnel = mainData.agence.personnel[codePersonnel];

    let prenomPersonnel = inputDiv.getElementsByClassName("prenomPersonnel")[0];
    let nomPersonnel = inputDiv.getElementsByClassName("nomPersonnel")[0];
    let NCNSSPersonnel = inputDiv.getElementsByClassName("NCNSSPersonnel")[0];
    let servicePersonnel = inputDiv.getElementsByClassName("servicePersonnel")[0];
    let portablePersonnel = inputDiv.getElementsByClassName("portablePersonnel")[0];
    let dateEntrePersonnel = inputDiv.getElementsByClassName("dateEntrePersonnel")[0];
    let salairePersonnel = inputDiv.getElementsByClassName("salairePersonnel")[0];

    prenomPersonnel.disabled = false;
    nomPersonnel.disabled = false;
    NCNSSPersonnel.disabled = false;
    servicePersonnel.disabled = false;
    portablePersonnel.disabled = false;
    dateEntrePersonnel.disabled = false;
    salairePersonnel.disabled = false;

    // Hidde edit div and show confirm div
    modEmp.setAttribute("class", "modEmp hidden");
    confEditEmp.setAttribute("class", "confEditEmp");
    
    // Hidde confirm div, show edit div, reset Emp details, disable inputs
    noEditEmp.addEventListener("click",function(){
        yesEditEmp.removeEventListener("click",yesHandler);
        modEmp.setAttribute("class", "modEmp");
        confEditEmp.setAttribute("class", "confEditEmp hidden");
        prenomPersonnel.disabled = true;
        nomPersonnel.disabled = true;
        NCNSSPersonnel.disabled = true;
        servicePersonnel.disabled = true;
        portablePersonnel.disabled = true;
        dateEntrePersonnel.disabled = true;
        salairePersonnel.disabled = true;
        // Reset Details
        prenomPersonnel.value = personnel.prenomPersonnel;
        nomPersonnel.value = personnel.nomPersonnel;
        NCNSSPersonnel.value = personnel.NCNSSPersonnel;
        servicePersonnel.value = personnel.servicePersonnel;
        portablePersonnel.value = personnel.portablePersonnel;
        dateEntrePersonnel.value = personnel.dateEntrePersonnel;
        salairePersonnel.value = personnel.salairePersonnel;
    });
    let yesHandler = function(){
        let listInputs = inputDiv.querySelectorAll("input")
        let inputChecked = true;
        let errorStyle = "border-color: rgb(202, 86, 65);outline:none;box-shadow:none";
        let correctStyle = "border-color: #45af69;outline:none;box-shadow:none";
        // check if inputs are not empty
        listInputs.forEach(input => {
            if(!input.value){
                inputChecked = false;
                input.style = errorStyle;
            }
            else
                input.style = correctStyle;
        });
        // If all inputs are not empty then display iframe and submit data
        if(inputChecked){
            // Display iframe
            let data = `../agence/updateEmp.php?codePersonnel=${codePersonnel}&prenomPersonnel=${prenomPersonnel.value}&nomPersonnel=${nomPersonnel.value}&NCNSSPersonnel=${NCNSSPersonnel.value}&servicePersonnel=${servicePersonnel.value}&portablePersonnel=${portablePersonnel.value}&dateEntrePersonnel=${dateEntrePersonnel.value}&salairePersonnel=${salairePersonnel.value}`;
            runIFrame("empSubmitPage-"+personnel.codePersonnel, data, 5);
            modEmp.setAttribute("class", "modEmp");
            confEditEmp.setAttribute("class", "confEditEmp hidden");
            prenomPersonnel.disabled = true;
            nomPersonnel.disabled = true;
            NCNSSPersonnel.disabled = true;
            servicePersonnel.disabled = true;
            portablePersonnel.disabled = true;
            dateEntrePersonnel.disabled = true;
            salairePersonnel.disabled = true;
            yesEditEmp.removeEventListener("click",yesHandler);
            setTimeout(checkMainData,2000);
            
        }
    };
    // Submit details
    yesEditEmp.addEventListener("click", yesHandler, false);

}


// Delete emp
function delEmp(inputDiv){
    let modEmp = inputDiv.getElementsByClassName("modEmp")[0];
    let confRemoveEmp = inputDiv.getElementsByClassName("confRemoveEmp")[0];
    let yesDelEmp = inputDiv.getElementsByClassName("yesDelEmp")[0];
    let noDelEmp = inputDiv.getElementsByClassName("noDelEmp")[0];

    // Hidde edit div and show confirm div
    modEmp.setAttribute("class", "modEmp hidden");
    confRemoveEmp.setAttribute("class", "confRemoveEmp");
    
    // Hidde confirm div, show edit div
    noDelEmp.addEventListener("click", function(){
        yesDelEmp.removeEventListener("click", yesHandler);
        modEmp.setAttribute("class", "modEmp");
        confRemoveEmp.setAttribute("class", "confRemoveEmp hidden");
    });
    // Delete Emp
    let yesHandler = function(){
        let codePersonnel = inputDiv.getAttribute("id").split("emp-")[1];
        let url = `../agence/removeEmp.php?codePersonnel=${codePersonnel}&codeUtilisateur=${mainData.agence.personnel[codePersonnel].codeUtilisateur}`;
        runIFrame("removePersonnel", url, 5);
        modEmp.setAttribute("class", "modEmp");
        confRemoveEmp.setAttribute("class", "confRemoveEmp hidden");
        // window.open(url, "_blank");
        setTimeout(checkMainData,2000);
    }
    yesDelEmp.addEventListener("click", yesHandler, false);
}