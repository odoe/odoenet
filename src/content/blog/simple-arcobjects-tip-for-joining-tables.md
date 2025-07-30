---

title: Simple ArcObjects Tip for Joining Tables
published: true
author: Rene Rubalcava
pubDate: 2011-05-18
description: I have recently been doing a lot of work on our server side
  functions using ESRI ArcObjects. I'm not what one might call an ArcObjects
  expert, and I know my way around some C# and .NET. Currently, if you want to
  learn ArcObjects, you need to wade through the online documentation, struggle
  with the search features and rummage over forum postings. The ArcObjects book
  lays a pretty good foundation, but is pretty outdated (it uses VB6 for
  examples), but with a little leg work, most devs could probably pick it up.
---

I have recently been doing a lot of work on our server side functions using
[ESRI ArcObjects](http://help.arcgis.com/en/sdk/10.0/arcobjects_net/ao_home.html).
I'm not what one might call an ArcObjects expert, and I know my way around some
C# and .NET. Currently, if you want to learn ArcObjects, you need to wade
through the online documentation, struggle with the search features and rummage
over forum postings. The
[ArcObjects book](http://www.amazon.com/gp/product/158948018X/ref=as_li_ss_tl?ie=UTF8&tag=odoenet-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=158948018X)
lays a pretty good foundation, but is pretty outdated (it uses VB6 for
examples), but with a little leg work, most devs could probably pick it up.

I thought I would share a cool little tip I learned while working with some
large data. We have a parcel data set (ArcSDE) that has approximately 2 million
features with unique id's. I needed a function that would let us find a parcel
quickly. That's the easy part, but we also have a table in the SDE that has the
detailed information for the parcel features, including addresses, land use and
so forth. I also needed to return this information to a web application. This
can be accomplished a couple of ways, you can build a relationship or you can do
a join in the ArcGIS Server MapService via your mxd.

The classic table join slowed the service to a crawl. Even after applying tablur
indexes. This is 2 million features after all. A relationship may also be a good
choice and can be accessed via ArcObjects. I don't have direct access to the
SDE, and besides we update this data on an annual basis, so I don't know if that
also requires the relationships to be rebuilt on the SDE every time the Feature
and other Table are updated. One of my goals when developing my server functions
is to lessen the maintenance need of our IT group for our GIS data, so I wanted
to try to figure out a way to do this kind of query on the fly and to do it
quickly.

Up until now I had been using
[IQueryFilter](http://help.arcgis.com/en/sdk/10.0/arcobjects_net/componenthelp/index.html#//0025000006mr000000)
to query features in my functions. This won't let me do table joins though. Then
I discovered the
[IQueryDef interface which will let you do table joins](http://help.arcgis.com/en/sdk/10.0/arcobjects_net/conceptualhelp/index.html#//0001000002zw000000),
and you use the where clause to define that join.

IQueryDef queryDef = workSpace.CreateQueryDef(); queryDef.Tables = "sde.Parcels,
sde.Parcels_Details"; queryDef.WhereClause = "sde.Parcels.AIN =
sde.Parcels_Details.AIN";

This looked just like what I needed. It worked ok, but it was still joining some
2 million records. At first I was defining my parcel query with a second
IQueryFilter. Then it occurred to me that I could just find my feature with all
the joined data by looking for it with IQueryDef.

queryDef.WhereClause = "sde.Parcels.AIN = sde.Parcels_Details.AIN AND
sde.Parcels.AIN = ' + ainString + ';

This way the join only occurs on that single feature instead of 2 million
features. This method is really quick now. For the record, we use
[WebOrb](http://www.themidnightcoders.com/products/weborb-for-net/overview.html)
in-house for our server functions, and this allows me to use Remote Objects with
the [ESRI Flex API](http://help.arcgis.com/en/webapi/flex/index.html). This
little function is proving to be a valuable resource in our current day-to-day
use.

One other item that took me a while to figure out was how to get an
IFeatureCursor out of the IQueryDef. I was able to do that in the following
steps.

IFeatureDataset fd = workSpace.OpenFeatureQuery("sde.Parcels", queryDef); // use
the IQueryDef to get an IFeatureDataset IFeatureClassContainer fcc = fd as
IFeatureClassContainer; // cast it as am IFeatureClassContainer IFeatureClass
featureClass = fcc.get_ClassByName("sde.Parcels"); // pull the IFeatureClass out
of the container IQueryFilter qf = new QueryFilterClass(); // just need an empty
QueryFilter IFeatureCursor fc = featureClass.Search(qf, false); // now I have an
IFeatureCursor that I can use to access the Feature attributes and geometries

Once I do this, I use the IFeature with
[my .NET to Flex classes library](https://github.com/odoe/esri_dotnet_flex) to
send a FeatureSet to my ESRI Flex Application.

So that is my ArcObjects tip of the day. There might be some better ways of
performing this function or a quicker way of getting to the IFeatureCursor from
IQueryDef. I am always open to some helpful tips. Maybe it's common knowledge
for seasoned ArcObjects devs, but I thought it was pretty cool.
