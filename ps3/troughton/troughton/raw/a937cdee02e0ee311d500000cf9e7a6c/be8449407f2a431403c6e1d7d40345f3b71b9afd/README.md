PS3 MDDN 342 2016

I've now got a fully loaded 3D scene displaying – next step is customising it based on the retrieved data. Unfortunately, I've had to modify the p5.js file in order to get lighting working correctly – the source version has a bug in which the vertex normals aren't correctly renormalised after being transformed by the inverse transpose model-view matrix.

The scene currently being displayed is of a clear day in very cold conditions.