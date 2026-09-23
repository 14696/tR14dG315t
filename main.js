/* ========== main.js ========== */

const body = document.body;
const gTextInput = document.getElementById( "textInput" );
const mInterval = 40;
var mTimer;
let isFinishTypeEffect = false;

let isCompile = false;
let isWhoAmI = false;
let isInputEnter = false;
let isTXBXFalseEnter = false;

let TXBXcount = 0;
let isTXBXcount = false;
var mCount = 0;
let isStart = false;

// ========== USER TEXTBOX INPUT ==========
function ShowTXBX()
{
	gTextInput.value = "";
	gTextInput.classList.remove( "hidden" );
}

function TXBXTrueEnter()
{
	gTextInput.remove();
	isInputEnter = true;
	console.log( "trueEnter true" );

	//const mVideo = document.getElementById( "video-id" );
	//mVideo.classList.remove( "hidden" );
}

function TXBXFalseEnter()
{
	console.log( "false" );
	gTextInput.value = "";
	const GlitchError = document.querySelector( ".glitch-error-text" );
	EffectGlitch( GlitchError );
	
	if( isTXBXFalseEnter == false ){
		let CurrentTextInputTop = parseInt( gTextInput.style.top );
		gTextInput.style.top = ( CurrentTextInputTop + 210 ) + "px";
		console.log( "CurrentTextInputTop" + CurrentTextInputTop );
	}
	isTXBXFalseEnter = true;
}

function TXBXCompileEnter()
{
	console.log( "compile" );
	gTextInput.value = "";
	const TextCompile = document.querySelector( ".typing-conpile-text" );
	EffectTyping( TextCompile, 1 );
	isCompile = true;	
	if( isCompile == true ){
		let CurrentTextInputTop = parseInt( gTextInput.style.top );
		gTextInput.style.top = ( CurrentTextInputTop + 336 ) + "px";
		console.log( "CurrentTextInputTop" + CurrentTextInputTop );
	
	}
}

function TXBXWhoAmI()
{
	console.log( "$whoami" );
	gTextInput.value = "";
	const TextWhoAmI = document.querySelector( ".typing-whoami-text" );
	EffectTyping( TextWhoAmI, 1 );
	isWhoAmI = true;
	if( isWhoAmI == true ){
		let CurrentTextInputTop = parseInt( gTextInput.style.top );
		gTextInput.style.top = ( CurrentTextInputTop + 336 ) + "px";
		console.log( "CurrentTextInputTop" + CurrentTextInputTop );
	}
}

function TXBXcheck()
{
	/* == Compile the nill.cs == */
	if( gTextInput.value == "nill" && isCompile == true ){
		TXBXTrueEnter();
	}
	if( gTextInput.value == "csc nill.cs" ){
		TXBXCompileEnter();
	}
	if( gTextInput.value == "whoami" ){
		TXBXWhoAmI();
	}else{
//================================================================
		TXBXFalseEnter();
//================================================================
	}
}

// ========== TYPE ANIMATION ==========
function EffectTyping( TElement, frame )
{
	/*if ( TElement.dataset.typed === "true" || !TElement.dataset.text ) {
		return;
	}
	*/
	if( !TElement.dataset.text ){
		return;
	}
	TElement.dataset.typed = "true";

	const TText = TElement.dataset.text.replace(/\\nn/g, "\n");
	TypeFrame = frame;

	let idx = 0;
	const interval = setInterval( function()
	{
		const partialText = TText.slice( 0, idx + 1 ).replace( /\n/g, "<br>" );
		TElement.innerHTML = partialText;
		TXBXcount ++;
		console.log( "TXBXcount=" + TXBXcount );
		idx++;
		if( idx >= TText.length ){
			clearInterval( interval );
		}
		ScrollToBottom();
	}, TypeFrame);
}

function ScrollToBottom()
{
	const typingwindow = document.getElementById( "typingwindow" );
	typingwindow.scrollTop = typingwindow.scrollHeight;
	//console.log( "ScrollToBottom()" );
}

// ========== GLITCH ANIMATION ==========
function EffectGlitch( GElement )
{
	let GText = GElement.dataset.text.replace( /\\nn/g, "\n" );
	const GLITCH_CHAR = "floatbreathcorehissif(fragilitythreshold)render(emotion)=+<>{}";
	const scramblesPerChar = 1;
	const GlitchFrame = 50;
	//GlitchFrame = frame;
	
	const totalIterations = GText.length * scramblesPerChar;
	let iteration = 10;

	/*if( GElement.dataset.glitched === "true" || isInputEnter == false ){
		return;
	}
	*/
	GElement.dataset.glitched = "true";

	const interval = setInterval( function()
	{
		let newTextArray = [];
		for( let i = 0; i < GText.length; i++ ){
			const originalChar = GText[ i ];
			if( originalChar === "\n" ){
				newTextArray.push( "<br>" );
				continue;
			}
			const revealStartTime = i * scramblesPerChar / 2;
			if( iteration >= revealStartTime ){
				const revealProgress = Math.min( 1, (iteration - revealStartTime) / (scramblesPerChar * 2) );
				if( Math.random() < revealProgress ){
					newTextArray.push( originalChar );
					continue;
				}
			}
			const randomChar = GLITCH_CHAR[ Math.floor( Math.random() * GLITCH_CHAR.length ) ];
			newTextArray.push( randomChar );
		}

		GElement.innerHTML = newTextArray.join( "" );
		if( iteration >= totalIterations || GElement.textContent === GText ){
			clearInterval( interval );
			GElement.innerHTML = GText.replace( /\n/g, "<br>" );
		}
		iteration ++;
		ScrollToBottom();
	}, GlitchFrame );
}

let gTyping = [];
let gGlitch = [];
//===============================================================
let gMenuTyping = [];
//===============================================================
	
document.addEventListener( "DOMContentLoaded", function()
{
	gTyping = document.querySelectorAll( ".typing-text" );
	gGlitch = document.querySelectorAll( ".glitch-text" );
//===============================================================
gMenuTyping = document.querySelectorAll( ".menu-item" );
//===============================================================
});

window.addEventListener( "scroll", function()
{	
	let scroll = [ 200, 2000 ];
	
	const ScrollY = window.scrollY
	let background_change_one = "background-change-one";
	let background_change_two = "background-change-two";
	
	if( ScrollY > scroll[ 1 ] ){
		body.classList.remove( background_change_one );
		body.classList.add( background_change_two );
	}else if( ScrollY > scroll[ 0 ] ){
		body.classList.add( background_change_one );
		body.classList.remove( background_change_two );
	}else{
		body.classList.remove( background_change_one );
		body.classList.remove( background_change_two );
	}
});

function tick()
{
	mCount ++;
	if( isStart == false ){
		if( mCount > 10 ){
			Start();
		}
	}

	if( isTXBXcount == false ){
		if( TXBXcount > 800 ){
			ShowTXBX();
			gTextInput.focus();
			isTXBXcount = true;
			console.log( "isTXBXcount = true" );
		}
	}
	/*
	if( isFinishTypeEffect == true ){
		gTextInput.focus();
		//console.log( "isFinishTypeEffect == true" );
	}
	*/

// ========================================================================
	if( isInputEnter == true ){
		document.querySelectorAll( ".typing-text" ).forEach( p =>
		{
			/*let node = p.nextSibling;
			while( node && node.nodeName === "BR" ){
				const next = node.nextSibling;
				node.remove();
				node = next;
			}
			p.remove();*/
		});
		gGlitch.forEach( function( GElement )
		{
			if( GElement.dataset.glitched === "true" ){
				return;
			}
			EffectGlitch( GElement );
		});
//=========================================================
	}
}

function onPaint()
{
	if( !mTimer ){
		mTimer = performance.now();
	}
	if( mTimer + mInterval < performance.now() ){
		mTimer += mInterval;
		tick();
	}
	requestAnimationFrame( onPaint );
}

function Start()
{
	console.log( "Start()" );
	gTyping.forEach( function( TElement )
	{
		// text = TElement.dataset.text;
		EffectTyping( TElement, 15 );
	});

//===============================================================
	gMenuTyping.forEach( function( TElement )
	{
		EffectTyping( TElement, 45 );
	});
//===============================================================

	/*setTimeout( function()
	{
		isFinishTypeEffect = true;
		ShowTXBX();
	},12000);//22000);
	*/
	isStart = true;
}

document.getElementById( "textInput" ).addEventListener( "keyup", function( ev )
{
	if( ev.key == "Enter" ){
		TXBXcheck();
	}
});

window.onload = function()
{
	requestAnimationFrame( onPaint );
}