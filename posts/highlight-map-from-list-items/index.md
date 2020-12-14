---
title: "Highlight Map from List Items"
published: true
author: Rene Rubalcava
date: "2009-12-09"
---

I was inspired by [this posting](http://blogs.esri.com/Dev/blogs/arcgisserver/archive/2009/02/19/Sychronizing-map-and-datagrid-interaction-with-the-ArcGIS-API-for-Flex.aspx) on the ESRI ArcGIS Server Blog filed in the Flex tag, that linked your graphics on a map with a DataGrid. This is a useful function and one I thought could be encapsulated into it's own task. In my case, I just had a need to highlight a graphic on my map that was associated with a list. I did not need to highlight the list when I hovered over the map because I have designed my Graphics with tooltips and felt that two-way binding would be "too much" flash for business purposes. You certainly encapsulate that function and if I were to do so, would probably build it into a utility type of class. With that said, here is the code. \[cc lang="actionscript3"\] package net.odoe.model.graphic { import com.esri.ags.Graphic; import com.esri.ags.geometry.Geometry; import com.esri.ags.layers.GraphicsLayer; import com.esri.ags.symbol.SimpleFillSymbol; import com.esri.ags.symbol.SimpleLineSymbol; import com.esri.ags.symbol.SimpleMarkerSymbol; import com.esri.ags.symbol.Symbol;

public class HighlightGraphic extends Graphic{ protected var \_defaultSymbol : Symbol = new Symbol(); /\*\*\* \* This function will save the default graphic symbology \* highlight the graphic for the currently selected item. \* @param data that holds attribute information; i.e. from a ListEvent (event.itemRenderer.data). \* @param graphicsLayer that holds the graphics that can be selected. \* @return a higlighted graphic. \*\*/ public function setHighlightGraphic( data : Object, graphicsLayer : GraphicsLayer ) : Graphic { if( graphicsLayer ) { \_defaultSymbol = findGraphicByAttribute( data , graphicsLayer).symbol; return featureHighlight( data, graphicsLayer ); } return new Graphic(); }

/\*\*\* \* This function will reset the previously selected graphic \* to its default symbology. \* @param data that holds attribute information; i.e. from a ListEvent (event.itemRenderer.data). \* @param graphicsLayer that holds the graphics that can be selected. \* @return default graphic.\*\*/

public function resetDefaultGraphic( data : Object, graphicsLayer : GraphicsLayer ) : Graphic { if( graphicsLayer ) { var \_graphic : Graphic = findGraphicByAttribute( data, graphicsLayer ); \_graphic.symbol = \_defaultSymbol; return \_graphic; } return new Graphic(); }

protected function findGraphicByAttribute( attributes : Object, graphicsLayer : GraphicsLayer ) : Graphic { for each( var graphic : Graphic in graphicsLayer.graphicProvider ) { if ( graphic.attributes == attributes ) { return graphic; } } return new Graphic(); }

protected function featureHighlight( data : Object, graphicsLayer : GraphicsLayer ) : Graphic { if( graphicsLayer ) { var \_graphic : Graphic = findGraphicByAttribute( data, graphicsLayer ); \_graphic.symbol = highLightSymbol( \_graphic.geometry ); return \_graphic; }

return new Graphic(); }

protected function highLightSymbol( geometry : Geometry ) : Symbol { if( geometry.type == Geometry.POLYLINE ) { var \_highlightLineSymbol : SimpleLineSymbol = new SimpleLineSymbol; \_highlightLineSymbol.color = 0xFF00FF; \_highlightLineSymbol.width = 10; return \_highlightLineSymbol; } if( geometry.type == Geometry.MAPPOINT ) { var \_outline : SimpleLineSymbol = new SimpleLineSymbol; \_outline.style = "solid"; \_outline.color = 0x0000CD; \_outline.width = 2; var \_highlightPtSymbol : SimpleMarkerSymbol = new SimpleMarkerSymbol; \_highlightPtSymbol.style = "circle"; \_highlightPtSymbol.color = 0xFF00FF; \_highlightPtSymbol.size = 15; \_highlightPtSymbol.alpha = 1; \_highlightPtSymbol.outline = \_outline; return \_highlightPtSymbol; } if( geometry.type == Geometry.POLYGON ) { var \_outlinePoly : SimpleLineSymbol = new SimpleLineSymbol(); \_outlinePoly.style = "solid"; \_outlinePoly.color = 0x0000CD; \_outlinePoly.width = 2; var \_highlightPolySymbol : SimpleFillSymbol = new SimpleFillSymbol; \_highlightPolySymbol.style = "solid"; \_highlightPolySymbol.color = 0x00FFFF; \_highlightPolySymbol.alpha = 0.3; \_highlightPolySymbol.outline = \_outlinePoly;

return \_highlightPolySymbol; }

return new Symbol(); }

} } \[/cc\] I have made the functions in here protected, as I found a need at a later time to extend this class and override the protected function findGraphicByAttribute to recognize a particular attribute field (i.e. graphic.attributes.Name == attributes.Name) and not just all attributes.

I made an example of the function just like the one on the ESRI ArcGIS Server Blog using my class.

It can be found [here](http://odoe.net/thelab/flex/highlightmap/Index.html) with [View Source](http://odoe.net/thelab/flex/highlightmap/srcview/index.html) enabled. Hope this benefits someone.
