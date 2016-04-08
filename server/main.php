<?php
// The XML data file with whitespace such as tabs
$xml_file = "modulations.xml";

// Load xml data.
$xml = file_get_contents($xml_file);

// Strip whitespace between xml tags
$xml = preg_replace('~\s*(<([^-->]*)>[^<]*<!--\2-->|<[^>]*>)\s*~','$1', $xml);

// Convert CDATA into xml nodes.
$xml = simplexml_load_string($xml);

// Return JSON.
echo json_encode($xml);
?>