# Volto AEMET Weather (volto-aemet)

[![npm](https://img.shields.io/npm/v/volto-aemet)](https://www.npmjs.com/package/volto-aemet)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://collective.github.io/volto-aemet/)
[![Code analysis checks](https://github.com/collective/volto-aemet/actions/workflows/code.yml/badge.svg)](https://github.com/collective/volto-aemet/actions/workflows/code.yml)
[![Unit tests](https://github.com/collective/volto-aemet/actions/workflows/unit.yml/badge.svg)](https://github.com/collective/volto-aemet/actions/workflows/unit.yml)

<a href="https://www.aemet.es/" title="Agencia Estatal de Meteorología - AEMET. Gobierno de España" target="_blank">
  <img width="400" alt="Agencia Estatal de Meteorología - AEMET. Gobierno de España" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/_static/logo.svg">
</a>

A volto add-on that integrates AEMET service with Plone to report the weather forecast.

## Features

- Control panel in `Plone` registry to manage `AEMET Settings`.

- Add a restricted RESTful API endpoint that exposes the `AEMET Settings` for `Volto` _integration_.

- Add a `AEMET Weather Current` `Volto` content block.

- Add a `AEMET Weather Forecast` `Volto` content block.

- Add a `React` component called `Weather`, that uses data from the `AEMET` service.

## Screenshots

**AEMET Weather Current Volto content block**

<img width="720" alt="AEMET Settings" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/volto-content-block-aemet-weather-current.png">

---

**AEMET Weather Forecast Volto content block**

<img width="720" alt="AEMET Settings" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/volto-content-block-aemet-weather-forecast.png">

## Plone CMS integration

To use this product in `Plone` CMS, you needs to include the following add-on
in your project: https://github.com/collective/collective.volto.aemet.

## Translations

This product support the following languages:

- Basque

- Catalan

- English

- Galician

- Spanish

## Compatibility

- Tested with `Node.js` 22.16.0 and `Volto` 18.

## Install it

To install in your project, the `volto-aemet` add-on, you must choose the method appropriate
to your version of `Volto`.


### Volto 18 and later

Add `volto-aemet` to your `package.json` file:

```json
"addons": [
    "volto-aemet": "*"
]
```

```json
"dependencies": {
    "volto-aemet": "*"
}
```

#### Install from Github

If you trying to install from Github you need edit the `mrs.developer.json` file:

```json
{
  "volto-aemet": {
    "develop": true,
    "output": "./packages/",
    "package": "volto-aemet",
    "url": "git@github.com:collective/volto-aemet.git",
    "https": "https://github.com/collective/volto-aemet.git",
    "branch": "main"
  }
}
```

The `mrs.developer.json` file is using by an `NodeJS` utility called `mrs.developer` that makes
it easy to work with `NPM` projects containing lots of packages, of which you only want to
develop some.

Also add `volto-aemet` to your `package.json` file:

```json
"addons": [
    "volto-aemet": "*"
]
```

```json
"dependencies": {
    "volto-aemet": "workspace:*",
}
```

---

### Volto 17 and earlier

Create a new `Volto` project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon volto-aemet
cd my-volto-project
```

Add `volto-aemet` to your `package.json` file:

```json
"addons": [
    "volto-aemet"
],

"dependencies": {
    "volto-aemet": "*"
}
```

Download and install the new add-on by running:

```shell
yarn install
```

Start `Volto` with:

```shell
yarn start
```

## Enable it

Visit http://localhost:3000/ in a browser, login, so go to `Site setup`, next to `Add-ons` control panel, 
find the `collective.volto.aemet` add-on and select the `Install` button for enabled it.

## Settings it

This integration uses the `AEMET` service called '[Predicción por municipios](https://www.aemet.es/es/eltiempo/prediccion/municipios)'
on its website. For example, for the every municipality:

- '[Sevilla (Sevilla)](https://www.aemet.es/es/eltiempo/prediccion/municipios/sevilla-id41091)', it provides detailed information
   on the weather forecast for this municipality. It also exports information in `XML` format:

   - https://www.aemet.es/xml/municipios/localidad_41091.xml

     ```{note}
     The `XML` file name has a prefix called `localidad_` and a suffix with an **ID**. For example,
     the ID for the municipality of _Seville_ is `41091`. This **ID** will be used later in the
     `AEMET Settings` control panel.
     ```

To use this add-on, go to the ``Site setup``, next to the ``Add-on Configuration`` icon, as shown below:

<img width="290" alt="Add-on Configuration" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/addon-configuration-aemet-icon.png">

This `AEMET Settings`, you can access the control panel, as shown below:

<img width="720" alt="AEMET Settings" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/aemet-settings.png">

In this control panel, you can configure the following fields:

- ``Location ID``, The Location ID of the AEMET service, for example '41091' to Sevilla location ID.

## Use it

To use the `AEMET` integration you need add the `volto-aemet` add-on, in
your `Volto` project and use the amazing features into this add-on`.

### Volto content block

This add-on include two (02) `Volto` content blocks as the following:

#### AEMET weather current

This `Volto` content block has no customisation options, just uses the settings defined in the `AEMET Settings` control panel.

<img width="720" alt="AEMET Weather Current" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/volto-content-block-aemet-weather-current.png">

---

#### AEMET weather forecast

This `Volto` content block lets you to add the original widget provided by `AEMET` to the user’s interface, as shown below:

<img width="720" alt="AEMET Weather Forecast" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/volto-content-block-aemet-weather-forecast.png">

When you select the block, the available block settings are displaying in the `Block` tab in the right-hand column, as shown below:

<img width="377" alt="AEMET Weather Forecast - Edit mode" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/volto-content-block-aemet-weather-forecast-edit.png">

##### Basic options

- **Province**

  The name of the province of the location (in lowercase) of the AEMET service.

- `Location ID`

  The `Location ID` of the `AEMET` service, for example '41091' to Sevilla location ID.

This widget integration uses the `AEMET` service called '["Widget" para la Predicción por municipios](https://www.aemet.es/es/eltiempo/widgets/municipios/)'
on its website. For example, for the every municipality:

- '[Madrid (Madrid)](https://www.aemet.es/es/eltiempo/widgets/municipios/madrid-id28079)', it provides detailed information widget
   on the weather forecast for this municipality.

   - https://www.aemet.es/es/eltiempo/widgets/municipios/madrid-id28079

     ```{note}
     In the previous url, it has a prefix `madrid` and a suffix numeric as an  **id**. For example,
     the ID (suffix numeric) for the municipality of _Madrid_ is `28079`.
     ```

- '[Sevilla (Sevilla)](https://www.aemet.es/es/eltiempo/widgets/municipios/sevilla-id41091)', it provides detailed information
   on the weather forecast for this municipality.

   - https://www.aemet.es/es/eltiempo/widgets/municipios/sevilla-id41091

     ```{note}
     In the previous url, it has a prefix `sevilla` and a suffix numeric as an  **id**. For example,
     the ID (suffix numeric) for the municipality of _Sevilla_ is `41091`.
     ```

## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other `Volto` core improvements.
For this reason, it only works with pnpm and `Volto` 18 (currently in alpha).


### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 22
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:collective/volto-aemet.git
    cd volto-aemet
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

## Credits

Developed with the support of:

- [Agencia Estatal de Meteorología - AEMET. Gobierno de España](https://www.aemet.es/).

  <img width="200" alt="IMD Logo" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/aemet-logo-blue.svg">

- [Instituto Municipal de Deportes - IMD, Seville City Council, Spain](https://imd.sevilla.org/).

  <img width="200" alt="IMD Logo" src="https://raw.githubusercontent.com/collective/volto-aemet/refs/heads/main/docs/source/images/imd-ayto-logo.svg">

### Acknowledgements 🙏

Generated using [Cookieplone (0.9.10)](https://github.com/plone/cookieplone) and [cookieplone-templates (eb40854)](https://github.com/plone/cookieplone-templates/commit/eb4085428af6261227bcb086ece110bbe5475d89) on 2025-11-06 19:31:17.502224. A special thanks to all contributors and supporters!

## Authors

This product was developed by [Leonardo J. Caballero G.](https://github.com/macagua).

<img width="100" alt="Leonardo J. Caballero G." src="https://avatars.githubusercontent.com/u/185395?v=4&size=100">

## License

The project is licensed under the MIT license.
