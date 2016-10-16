define('tempo30/app/create-word', [
    'jquery',
    'lib/jszip-utils/jszip-utils',
    'lib/docxtemplater/docxtemplater-latest',
    'lib/file-saver/FileSaver',
], function ($, JSZipUtils, Docxtemplater, FileSaver) {

    function download() {
	console.log('jszip');
	JSZipUtils.getBinaryContent('docx/antrag-tempo30-template.docx',function(err,content){
	    console.log('a');
            if (err) { throw e;}
            doc=new Docxtemplater(content);
	    //set the templateVariables
            doc.setData( {'AntragStr':'Reeperbahn',
			  'Name':'Edgar Lustig',
			  'Bezirk':'Hamburg-Mitte',
			  'AdrStr':'Große Freiheit 1',
			  'AdrPLZ':'29999',
			  'AdrOrt':'Hamburg',
			  'Polizei':'Davidswache',
			  'PolizeiStr':'Reeperbahn 47',
			  'PolizeiPLZ':'28888',
			  'PolizeiOrt':'Hamburg',
			 }); 
            doc.render(); 
            out=doc.getZip().generate({type:"blob"}); 
	    saveAs(out,"tempo30-antrag.docx");
	});
    }

    return { 
	'download': download
    };
});