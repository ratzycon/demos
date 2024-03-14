console.log("including: postprocessing.js")

// postprocessing

var composer = null;

function setupPostProcessing(renderer, scene, camera)
{

	composer =  new THREE.EffectComposer( renderer );
	renderer.autoClear = false;

	var renderPass = new THREE.RenderPass( scene, camera );
	//renderPass.renderToScreen = true;
	//renderPass.clear = false;
	composer.addPass( renderPass );


	//var bloom = new THREE.BloomPass(1.3, 25);
	var bloom = new THREE.BloomPass(1.3, 7);
	//bloom.clear = false;
	//bloom.renderToScreen = true;
	composer.addPass(bloom);

	/*var blendPass = new THREE.ShaderPass( THREE.AdditiveBlendShader );
	blendPass.uniforms[ 'tBase' ].value = composer.renderTarget1;
    blendPass.uniforms[ 'tAdd' ].value = topComposer.renderTarget1;
    var blendComposer = new THREE.EffectComposer( renderer );
    blendComposer.addPass( blendPass );
    blendPass.renderToScreen = true;*/



	var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
	effectCopy.renderToScreen = true;
	composer.addPass(effectCopy);

}