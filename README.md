# script-hubspot-property-maker

## About The Project

This script is to create group and properties in HubSpot.

## Getting Started

### Prerequisites

- pnpm

### Installation

```sh
$ git clone git@github.com:kkznch/script-hubspot-property-maker.git
$ cd script-hubspot-property-maker
$ pnpm install
```

1. Get a free Access Token at HubSpot
   1. For example, when you create `contacts` property, you should set read and write permission to `crm.objects.contacts` in HubSpot Access Token Schema
2. Clone the repo
   ```sh
   $ git clone git@github.com:kkznch/script-hubspot-property-maker.git
   $ cd script-hubspot-property-maker
   ```
3. Install NPM packages
   ```sh
   pnpm install
   ```
4. Enter your HubSpot Access Token in `.env`
   ```shell
   HUBSPOT_ACCESS_TOKEN="YOUR-ACCESS-TOKEN"
   ```

## Usage

1. Write group and properties you want to create in `src/index.ts`.
   ```ts:src/index.ts
   ...
   const hubspotGroup = {
     objectType: 'contacts',
     name: 'new_group',
     label: '新しいグループ',
   };
   const hubspotProperties = [
     {
       groupName: hubspotGroup.name,
       name: 'new_property',
       label: '新しいプロパティ',
       type: PropertyCreateTypeEnum.String,
       fieldType: PropertyCreateFieldTypeEnum.Text,
     },
   ] satisfies PropertyCreate[];
   ...
   ```
2. Run pnpm run command.
   ```shell
   $ pnpm run
   ```
