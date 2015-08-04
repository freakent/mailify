#! /usr/bin/env node

var fs = require('fs');
var util = require('util')
var debug = util.debuglog('mailify')
var path = require('path')
var cheerio = require('cheerio')
var file_url = require('file-url')


if (process.argv.length < 3) {
    console.log("usage: %s", [process.argv[0], process.argv[1], "filename|path"].join(" "))
    process.exit(0)
}

var filename = process.argv[2]
var props = path.parse(filename)

    fs.readFile(filename, 'utf-8', function(err, contents) {
        processFile(filename, contents, function(err, new_contents) {
            if (contents != new_contents) {
                backupFile(filename, function(backup_filename) {
                    fs.writeFile(filename, new_contents)
                    console.log("%s, file updated, backup saved to %s", filename, backup_filename)
                })
            } else {
                console.log("%s, no changes required", filename)
            }
        })
    })

/* fs.readdir(file_path, function(err, files) {
    files.filter(function(file) { return file.substr(-5) === '.html'; })
         .forEach(function(file) {
              fs.readFile(file, 'utf-8', function(err, contents) { inspectFile(contents); }); });
});
*/

function processFile(filename, contents, next) {

    debug("Processing file %s", filename)

    var new_contents

    $ = cheerio.load(contents);

    $('img').attr('moz-do-not-send', null)

    $('img').each(function(i, tag) {
        //debug(tag.attribs.src)
        var old_src = tag.attribs.src
        var new_src = path.join(path.dirname(filename), old_src)

        if (path.extname(old_src) == "") {

            debug("Fixing file extention on %s", old_src)
            new_src = new_src + ".jpg"
            debug("from: %s to %s", old_src, new_src)
            cp(path.join(path.dirname(filename), old_src), new_src, function(err) {
                if (err) {
                    console.log("error in copy %s", err)
                    proces.exit(1)
                }
            })
            debug("File fixed")
        }

        $(this).attr('src', file_url(path.resolve(new_src)))

    })

    next(null, $.html())

}

function backupFile(filename, cb) {
    var backup_filename = filename + ".sav"
    var counter = 1
    while(exists(backup_filename)) {
        backup_filename = filename + ".sav." + counter++
    }
    debug("Using backup filename %s", backup_filename)
    fs.rename(filename, backup_filename, function(err, res) {
        if (err) {
            throw new Error(err)
        }
        cb(backup_filename)
    })
}

function cpX(from_file, to_file) {
    fs.createReadStream(from_file).pipe(fs.createWriteStream(to_file));
}

function cp(source, target, cb) {
  debug("copying from %s to %s", source, target)
  var cbCalled = false;
  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

function exists(filename) {
    try {
        var f = fs.statSync(filename)
        if (f.isFile()) {
            return true
        } else {
            return false
        }
    } catch(e) {
        return false
    }
}
