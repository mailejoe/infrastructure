import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import * as axios from 'axios';

const retrieveSecrets = async () => {
  const client = new SecretsManagerClient({ region: process.env.REGION });
  const command = new GetSecretValueCommand({ SecretId: process.env.SECRET_ID });
  const response = await client.send(command);

  return JSON.parse(response.SecretString);
};

const getMsgInfo = (event) => {
  return [
    {
      name: 'service',
      value: event['Trigger']['Dimensions'][0].value,
      inline: true
    },
    {
      name: 'alarm',
      value: event['AlarmName'],
      inline: true
    },
    {
      name: 'description',
      value: event['AlarmDescription'],
      inline: true
    },
    {
      name: 'oldestState',
      value: event['OldStateValue'],
      inline: true
    },
    {
      name: 'trigger',
      value: event['Trigger']['MetricName'],
      inline: true
    },
    {
      name: 'event',
      value: event['NewStateReason'],
      inline: true
    }
  ];
}

module.exports.handler = async function handler(event) {
  let config = await retrieveSecrets();

  event.Records.forEach((record) => {
    const msg = record['Sns']['Message'];
    if (msg.Trigger) {
      const discordData = {
        content: '',
        embeds: [{
          color: 15158332,
          fields: getMsgInfo(record),
        }],
      };

      try {
        await axios.post(config.DISCORD_WEBHOOK, discordData);
        console.log(`Discord Response: ${response.status} ${response.statusText}`);
      } catch (err) {
        console.error(err);
      }
    }
  });

  return 'SNS -> Discord completed successfully';
};
