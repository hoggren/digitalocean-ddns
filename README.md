# digitalocean-ddns

A minimal dynamic DNS record tool for [DigitalOcean](https://www.digitalocean.com) - run on a schedule on your machine with dynamic IP to keep your DNS record updated with your IP. **No unnecessary API calls. No hastle.**

## Install and get up running

1. Run `npm install digitalocean-dns --global`.
    Install it **globally** as it is a tool rather than a Javascript library.

2. Create a file named `.digitalocean.env` in a suitable directory.
    On a Linux or MacOS system i would create the file in your **home directory**. Fill it with a **API token** from DigitalOcean and the **domain** you want to control as the example file below. The ID field isn't needed in following step. 

3. Run `npm run records` to get ids of your domain records, see the example response.
    **Copy the id** of the record you want to command, usually the A record, and paste it into the `.digitalocean.env` file as in the example.

The configuration is done!

Now it's up to you how you want to schedule it, under Linux or MacOS I strongly recommend you using [crontab](https://crontab.guru/). It's already installed and fairly easy to use, the link includes a generator for the *cron expresson* needed. I included a complete out-of-the-box working example to get started under examples below.

### Examples

#### .digitalocean.env

```.digitalocean.env
TOKEN=1ed524e51e5d32d51a5a5a325a5616a46a135a1eded6e87de8d76e9d87d98cee
DOMAIN=hello.world
ID=123456
```

#### Example response

```json
[ { id: 12345678, type: 'NS', name: '@' },
  { id: 22345678, type: 'NS', name: '@' },
  { id: 32345678, type: 'NS', name: '@' },
  { id: 42345678, type: 'MX', name: '@' },
  { id: 52345678, type: 'MX', name: '@' },
  { id: 62345678, type: 'MX', name: '@' },
  { id: 72345678, type: 'MX', name: '@' },
  { id: 82345678, type: 'MX', name: '@' },
  { id: 92345678, type: 'A', name: '@' } ]

```

#### Crontab example

```bash
# Run digitalocean-ddns from my home directory 04:00 every night
0 4 * * * cd /home/myuser && digitalocean-ddns
```

## Version history

**0.0.3** - First release that works correct.  
Only requests Digitalocean if your IP has changed (except for first run which caches the result).
Environment file for dynamic usage.
Helper script to get the domain id you need.

I Would not advise anyone to go below this version.

## About

The tool origins from a Node.js script I used to update my records, and didn't differ much from this except that it's driven more dynamically by a environment file now.

**MIT** licensed, use with care and I'll not take care of any form of misbehavior, data loss etc. It works for me.

## Author

Patrik Hoggren  
*Software Developer*  
<p@hoggren.nu>  
