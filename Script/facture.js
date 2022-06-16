function savePdfPage(){
    var source = window.document.getElementById("pdf-content");
    var specialElementHandlers = {
        '#hidden-element': function (element, renderer) {
            return true;
        }
    };
    var doc = new jsPDF({
        orientation: 'landscape'
    });
    doc.setFont("courier");
    doc.setFontType("normal");
    doc.setFontSize(24);
    doc.setTextColor(100);
    doc.fromHTML(source, 15, 15, {
        'width': 720,
        'height': 1080,
        'elementHandlers': specialElementHandlers
    });
    doc.save("Facture.pdf");
}
// doc.text(source,10,10);
// doc.save("test.pdf");
// console.log(source.innerHTML);