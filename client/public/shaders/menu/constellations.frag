uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;
uniform sampler2D iChannel0;

void main()
{
    vec2 fragCoord = vUv * iResolution;
    //initialize animate time (10x speed)
    float t = iTime/0.1,
    //fractional starting index
    f = fract(-t),
    //whole-index for star
    w = 0.0;
    
    //screen uvs, centered and aspect correct (-0.5 to +0.5)
    vec2 suv = (fragCoord - iResolution.xy*0.5) / iResolution.y;
    
    //prepare the sum of the star colors
    vec3 rgb = vec3(0.0);
    
    //loop through 100 stars
    for(float i = f; i<1e2; i++)
    {
        //find the whole-number star index
        w = round(i+t);
        //square to prevent linear patterns. sin is a better alternative
        w *= sin(w); //sin(w)
        //pick a color using the index
        rgb += (cos(w+vec3(0,1,2))+1.)
        //vary the brightness with the index
        * exp(cos(w/.1)/.6)
        //fade in and out
        * min(1e3-i/.1+9.,i) / 5e4
        //attentuate outward
        / length(suv
        //set the star position
        + .08*cos(w*.31+vec2(0,5))*sqrt(i));
    }
    
    //Increase contrast
    rgb *= rgb;
    
    //Tanh tonemap:
    rgb = tanh(rgb);
    
    gl_FragColor = vec4(rgb, 1.0);
}