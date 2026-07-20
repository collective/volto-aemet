---
myst:
  html_meta:
    "description": "Terms and definitions used in the AEMET integration with Volto documentation."
    "property=og:description": "Terms and definitions used in the AEMET integration with Volto documentation."
    "property=og:title": "Glossary"
    "keywords": "Volto, AEMET, integration, glossary, term, definition"
---

(glossary-label)=

# Glossary

```{glossary}
:sorted: true

AEMET
    [AEMET](https://www.aemet.es/) (Agencia Estatal de Meteorología) is the Spanish State Meteorological Agency.
    It is the public body responsible for the development, implementation, and provision of meteorological and climatological services in Spain.
    It publishes official weather forecasts, warnings, and climate data through its website and open data services, including XML feeds per municipality.

collective.volto.aemet
    `collective.volto.aemet` is the Plone add-on that integrates AEMET weather data into a Plone site.
    It provides a control panel to configure the target municipality, a REST API endpoint to expose weather forecast data, and a browser layer to scope its components.
    It is designed to work together with the [volto-aemet](https://github.com/collective/volto-aemet) Volto add-on.

volto-aemet
    `volto-aemet` is the Volto add-on that integrates AEMET weather data into a Plone site via the `collective.volto.aemet` add-on.
    It provides a control panel to configure the target municipality, Two Volto content blocks..

Location ID
location_id
    The Location ID is a numeric code that uniquely identifies a Spanish municipality in the AEMET XML data service.
    It is used to construct the URL of the XML feed, for example:
    ``https://www.aemet.es/xml/municipios/localidad_28058.xml`` for Madrid (``28058``),
    or ``localidad_41091.xml`` for Sevilla (``41091``).
    It is configured via the {term}`AEMET Settings control panel` and stored in the Plone registry under the key ``aemet.location_id``.

AEMET Settings control panel
@@aemet-settings
    The AEMET Settings control panel is a configuration panel registered in Plone's Site Setup under *Add-on Configuration*.
    It stores the {term}`Location ID` in the Plone {term}`Registry` using the prefix ``aemet``.
    It is accessible via the REST API at ``@controlpanels/aemet-settings`` using ``GET`` (read) or ``PATCH`` (update) HTTP methods.

@aemet-weather-forecast
    ``@aemet-weather-forecast`` is the REST API endpoint provided by this add-on.
    It is publicly accessible (``zope2.View`` permission) and returns a JSON object with the current day's weather forecast for the configured municipality, fetched from the AEMET XML service.
    Example: ``GET /Plone/++api++/@aemet-weather-forecast``.

Registry
    The Plone Registry is a key-value store for site configuration, managed by the ``plone.registry`` package.
    Settings are declared through Zope schema interfaces and stored as typed records.
    In this add-on the records are declared in {term}`IAemetSettings` and stored under the ``aemet`` prefix (e.g. ``aemet.location_id``).
    They can be read using ``plone.api.portal.get_registry_record("aemet.location_id")``.

IAemetSettings
    ``IAemetSettings`` is the Zope schema interface that declares the configuration fields for the AEMET add-on.
    Currently it defines a single field: {term}`location_id`.
    It is used as the schema for both the {term}`AEMET Settings control panel` and the Plone {term}`Registry` records.

Volto
    [Volto](https://github.com/plone/volto) is the default React-based frontend for Plone 6.
    It communicates with Plone exclusively through the ``plone.restapi`` REST API.
    The companion add-on [volto-aemet](https://github.com/collective/volto-aemet) consumes the {term}`@aemet-weather-forecast` endpoint to display weather data in Volto blocks.

plone.restapi
    [plone.restapi](https://plonerestapi.readthedocs.io/) is the RESTful hypermedia API for Plone.
    It enables Volto and other clients to interact with Plone content and configuration over HTTP using JSON.
    This add-on registers its services and control panel adapters through ``plone.restapi``.

Plone
    [Plone](https://plone.org/) is an open-source content management system used to create, edit, and manage digital content such as websites, intranets, and custom solutions.
    It has over 20 years of development and is trusted by governments, universities, and organisations worldwide.
    In this integration, Plone acts as the backend intermediary between the AEMET data service and the Volto frontend.

add-on
    An add-on in Plone extends its core functionality.
    It is distributed as a Python package and installed via the Plone Site Setup.
    ``collective.volto.aemet`` is a Plone add-on.
    Its companion [volto-aemet](https://github.com/collective/volto-aemet) is a Volto (JavaScript) add-on.

```
