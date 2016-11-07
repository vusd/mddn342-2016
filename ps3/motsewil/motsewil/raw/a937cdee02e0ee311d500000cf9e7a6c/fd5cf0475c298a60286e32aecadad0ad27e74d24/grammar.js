var grammar = 
{
	"number" : ["2","3","4","5","6","7","8","9"],
	"horror-sequel"  : ["II","III","IV","V","VI","VII","the return","2: Electric boogaloo","#number# this time it's personal"],

	"space-adjective" : ["Black", "Grand", "Eternal", "Golden", "Deep"],
	"space-verb" : ["discovered","explored", "created", "destroyed"],
	"space-noun" : ["Love","the Sun","the economy","the ocean","what lies beneath"],	
	"space-time" : ["20 years","10,000 years", "7 minutes"],	
	"space-verb-current-tense" : ["kill", "stop", "discover", "revive","prevent"],

	"space-entity" : ["man", "woman","robot"],
	"space-place" : ["the #space-adjective# Lagoon", "Mars","Beyond" ],
	"space-event" : ["#space-adjective# Discovery", "#space-adjective# Darkness"],
	"ago-from" : ["ago","from now"],

	"space-movie" : [	"The #spEntity.capitalize# from #place#", "#spEntity.capitalize# and the #space-event#"],
	"space-tagline" : [ "What if #spEntity#kind never #space-verb# #space-noun#", "#space-time# #ago-from#, one #spEntity# #space-verb# #space-noun# - now it's time to #space-verb-current-tense# #space-noun#"],
	
	"horror-adjective" : ["spooky","bloody","terrifying","dark"],
	"horror-adjective2" : [	"run","hide", "escape" , "forget", "defeat"],
	"horror-place" : [	"asylum","cabin","hospital","moon","street","cave"],
	"horror-entity" : [	"blob" , "hunter","nurse","wraith","reaper"],
	"horror-movie" : [	"The #horEntity#", 	"The #horEntity# #horror-sequel#", 	"The #horEntity# from the #horror-adjective# #horror-place#",	"#horEntity# vs #horror-entity#"],
	"horror-tagline-2" : [	"your past", "your future", "yourself", "what you already know", "what you've become"],
	"horror-tagline-3" : [	"created", "always known", "tried to forget"],
	"horror-tagline" : [	"It begins",	"the final chapter",	"you can't #horror-adjective2# what you've #horror-tagline-3#",	"you can't #horror-adjective2# from  #horror-tagline-2#"],
	"season" : ["summer","winter","christmas","valentines day","fall","hanukka"],
	"romcom-noun" : ["alice","anastasia","christian","jack","timothy"],
	"romcom-lastname" : ["anderson","smith","gray","potter","peters"],
	"romcom-object" : ["the heart emoji", "the wink emoji","the rose","the holiday"],
	"romcom-quantity" : ["really", "kind of", "not that type of"],
	"romcom-adjective" : ["love","romantic","funny","long"],
	"romcom-event" : [
		"wedding","proposal","engagement","first love","final days","first date","last date"
	],
	"chick-flick-movie" : [
		"#entity.capitalize# and #romcom-noun.capitalize#",
		"#entity.capitalize# and #object#",
		"The #romcom-event.capitalize# of #entity.capitalize# #romcom-lastname.capitalize#"
	],
	"romcom-tagline" : [
		"It's #romcom-quantity# a #romcom-adjective# story",
		"This #season.capitalize# #entity.capitalize# will find out if #object# is all that"
	],
	"space" : ["#space-movie# : #space-tagline##space-split#"],
	"horror" : ["#horror-movie# : #horror-tagline##horror-split#"],
	"romcom" : ["#chick-flick-movie# : #romcom-tagline##romcom-split#"],
	"space-split" : ["$SPLIT$scifi$SPLIT$#spEntity#$SPLIT$#place#"],
	"horror-split" : ["$SPLIT$horror$SPLIT$#horEntity#$SPLIT$#horEntity2#"],
	"romcom-split" : ["$SPLIT$romcom$SPLIT$#entity#$SPLIT$#object#"],
	"origin": [
		"#[spEntity:#space-entity.capitalize#][place:#space-place#]space#",
		"#[horEntity:#horror-entity.capitalize#][horEntity2:#horror-entity#]horror#",
		"#[entity:#romcom-noun#][object:#romcom-object#]romcom#"
	]
}