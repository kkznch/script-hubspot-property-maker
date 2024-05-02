import dotenv from 'dotenv';
import { Client } from '@hubspot/api-client';
import {
  PropertyCreate,
  PropertyCreateFieldTypeEnum,
  PropertyCreateTypeEnum,
} from '@hubspot/api-client/lib/codegen/crm/properties';

dotenv.config();

const hubspot = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

const createGroup = async ({
  objectType,
  name,
  label,
}: {
  objectType: string;
  name: string;
  label: string;
}) => {
  try {
    const group = await hubspot.crm.properties.groupsApi.getByName(
      objectType,
      name
    );
    if (group) {
      console.info(`Group ${label}(${name}) already exists`);
      return;
    }
  } catch (e) {
    // If the group does not exist, an error will occur, so catch it and do nothing
  }

  // Because the name is unique, nothing happens even if you specify the same name as the property you created once
  hubspot.crm.properties.groupsApi.create(objectType, {
    name,
    label,
  });
};

const createProperties = async ({
  objectType,
  inputs,
}: {
  objectType: string;
  inputs: PropertyCreate[];
}) => {
  hubspot.crm.properties.batchApi.create(objectType, {
    inputs,
  });
};

const main = async () => {
  const hubspotGroup = {
    objectType: 'contacts',
    name: 'new_group', // This is unique name!
    label: 'New Group', // This is displayed name in HubSpot
  };

  const hubspotProperties = [
    {
      groupName: hubspotGroup.name,
      name: 'new_property', // This is unique name!
      label: 'New Property', // This is displayed name in HubSpot
      type: PropertyCreateTypeEnum.String,
      fieldType: PropertyCreateFieldTypeEnum.Text,
    },
  ] satisfies PropertyCreate[];

  await createGroup(hubspotGroup);
  await createProperties({
    objectType: hubspotGroup.objectType,
    inputs: hubspotProperties,
  });
};

try {
  await main();
  console.info('Success!');
} catch (error) {
  console.error(error);
}
