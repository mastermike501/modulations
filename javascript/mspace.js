$(document).ready(function(){
    var box, div, link, namespaceURI;
    // First check whether the page contains any <math> element.
    namespaceURI = "http://www.w3.org/1998/Math/MathML";
    if ($('math')) {
        // Create a div to test mspace, using Kuma's "offscreen" CSS
        $('body').prepend("<div id='testdiv' style='border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px;'><math xmlns='" + namespaceURI + "'><mspace id='testspace' height='23px' width='77px'></mspace></math></div>");
        box = document.getElementById("testspace").getBoundingClientRect();
        $('#testdiv').remove();
        if (Math.abs(box.height - 23) > 1  || Math.abs(box.width - 77) > 1) {
            // Insert the mathml.css stylesheet.
            link = document.createElement("link");
            link.href = "css/mathml.css";
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    }
});