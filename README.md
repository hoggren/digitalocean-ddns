# digitalocean-ddns

## Dynamic DNS for DigitalOcean!

A dynamic DNS record updater tool for [DigitalOcean](https://www.digitalocean.com). Schedule this to run on a machine with dynamic IP to keep your DNS record with your ip address. Caches the API response so no extraneous requests are done.

### Install and get started

1. Run `npm install digitalocean-ddns --global`, I would advise you to install it **globally** as it's a tool/utility.

2. Create a file named `.digitalocean.env` in your home directory, use the template below _but with your own values._

   **MacOS**: `/Users/<username>/.digitalocean.env`  
   **Linux**: `/home/<username/.digitalocean.env`  
   **Windows**: `<DRIVE>:/Users/<username>/.digitalocean.env`

3. Run `digitalocean-ddns --dns-records` to get ids of your domain records, see the example response. Copy the `id` of the record you want to be dynamic, usually the A record, and paste it into the `.digitalocean.env` file, example file below.

The configuration is done! Update the DNS record with `digitalocean-ddns --setDnsRecord`

It's up to you how you want to schedule it. On a Linux-ish OS I would advise you using [crontab](https://crontab.guru/) as it's the de facto standard. The link goes to to a crontab generator for the _cron expresson_ needed.

#### Templates and examples

##### .digitalocean.env example

```
TOKEN=1ed524e51e5d32d51a5a5a325a5616a46a135a1eded6e87de8d76e9d87d98cee
DOMAIN=hello.world
ID=123456
```

##### Example response

```
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

##### Crontab example (Unix-based systems)

```bash
# Run digitalocean-ddns from my home directory 04:00 every night
0 4 * * * cd /home/myuser && digitalocean-ddns --setDnsRecord
```

### Version history

**0.5.2** - Deprecated packages, upped versions, code cleanup, etc.

- Changed from `request` package to [npmjs.com/package/got](https://www.npmjs.com/package/got)
- Code cleanup/rewrite

---

**0.5.1** - Edited readme and better argument checking

- Better examples for env-file and check for correct arguments, not just any argument.

---

**0.5.0** - Refined readme

- Includes instructions. Version history was incorrect.

---

**0.4.1** - First release that works correct

- Only requests Digitalocean if your IP has changed (except for first run which caches the result).
- Environment file for dynamic usage. Helper script to get the domain id you need.

_I Would not advise anyone to go below this version._

## About

The tool origins from a Node.js script I used to setDnsRecord my records, and didn't differ much from this except that it's driven more dynamically by a environment file now.

**MIT** licensed, use with care and I'll not take care of any form of misbehavior, data loss etc. It works for me.

## Author

Patrik Hoggren  
_Software Developer_  
<p@hoggren.nu>
