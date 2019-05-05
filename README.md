# digitalocean-ddns

A dynamic DNS record updater tool for [DigitalOcean](https://www.digitalocean.com). Run it on a schedule on a machine which has a dynamic IP to keep your DNS record updated with your any changes.

**No unnecessary API calls. No hastle.**

## Install and get up running

1. Run `npm install digitalocean-ddns --global`.
    Install it **globally** as it is a tool rather than a Javascript library.

2. Create a file named `.digitalocean.env` in your home directory, use the template below - but with your own values.

    **MacOS**: `/Users/<username>/.digitalocean.env`  
    **Linux**: `/home/<username/.digitalocean.env`  
    **Windows**: `<DRIVE>:/Users/<username>/.digitalocean.env`  

3. Run `digitalocean-ddns --dns-records` to get ids of your domain records, see the example response.
    **Copy the id** of the record you want to command, usually the A record, and paste it into the `.digitalocean.env` file as in the example.

The configuration is done!

Run with `digitalocean-ddns --update`

Now it's up to you how you want to schedule it, under Linux or MacOS I strongly recommend you using [crontab](https://crontab.guru/). It's already installed and fairly easy to use, the link includes a generator for the *cron expresson* needed. I included a complete out-of-the-box working example to get started under examples below.

### Templates and examples

#### .digitalocean.env

```.digitalocean.env
TOKEN=1ed524e51e5d32d51a5a5a325a5616a46a135a1eded6e87de8d76e9d87d98cee
DOMAIN=hello.world
ID=123456
```

#### Example response

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

#### Crontab example (Unix-based systems)

```bash
# Run digitalocean-ddns from my home directory 04:00 every night
0 4 * * * cd /home/myuser && digitalocean-ddns --update
```

## Version history

**0.5.1** - Edited readme and better argument checking  
Better examples for env-file and check for correct arguments, not just any argument.

---

**0.5.0** - Refined readme.  
Includes instructions.  
Version history was incorrect.

---

**0.4.1** - First release that works correct.  
Only requests Digitalocean if your IP has changed (except for first run which caches the result).
Environment file for dynamic usage.
Helper script to get the domain id you need.

*I Would not advise anyone to go below this version.*

## About

The tool origins from a Node.js script I used to update my records, and didn't differ much from this except that it's driven more dynamically by a environment file now.

**MIT** licensed, use with care and I'll not take care of any form of misbehavior, data loss etc. It works for me.

## Author

Patrik Hoggren  
*Software Developer*  
<p@hoggren.nu>  
