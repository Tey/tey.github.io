
  var Module = typeof Module !== 'undefined' ? Module : {};
  
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }
  Module.expectedDataFileDownloads++;
  (function() {
   var loadPackage = function(metadata) {
  
      var PACKAGE_PATH;
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof location !== 'undefined') {
        // worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      } else {
        throw 'using preloaded data can only be done on a web page or in a web worker';
      }
      var PACKAGE_NAME = 'pyapp.data';
      var REMOTE_PACKAGE_BASE = 'pyapp.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
    
      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];
    
      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };
    
    function runWithFS() {
  
      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
  Module['FS_createPath']("/", "future", true, true);
Module['FS_createPath']("/future", "builtins", true, true);
Module['FS_createPath']("/future", "types", true, true);
Module['FS_createPath']("/future", "standard_library", true, true);
Module['FS_createPath']("/future", "backports", true, true);
Module['FS_createPath']("/future/backports", "email", true, true);
Module['FS_createPath']("/future/backports/email", "mime", true, true);
Module['FS_createPath']("/future/backports", "html", true, true);
Module['FS_createPath']("/future/backports", "http", true, true);
Module['FS_createPath']("/future/backports", "test", true, true);
Module['FS_createPath']("/future/backports", "urllib", true, true);
Module['FS_createPath']("/future/backports", "xmlrpc", true, true);
Module['FS_createPath']("/future", "moves", true, true);
Module['FS_createPath']("/future/moves", "dbm", true, true);
Module['FS_createPath']("/future/moves", "html", true, true);
Module['FS_createPath']("/future/moves", "http", true, true);
Module['FS_createPath']("/future/moves", "test", true, true);
Module['FS_createPath']("/future/moves", "tkinter", true, true);
Module['FS_createPath']("/future/moves", "urllib", true, true);
Module['FS_createPath']("/future/moves", "xmlrpc", true, true);
Module['FS_createPath']("/future", "tests", true, true);
Module['FS_createPath']("/future", "utils", true, true);
Module['FS_createPath']("/", "past", true, true);
Module['FS_createPath']("/past", "builtins", true, true);
Module['FS_createPath']("/past", "types", true, true);
Module['FS_createPath']("/past", "utils", true, true);
Module['FS_createPath']("/past", "translation", true, true);
Module['FS_createPath']("/", "libfuturize", true, true);
Module['FS_createPath']("/libfuturize", "fixes", true, true);
Module['FS_createPath']("/", "libpasteurize", true, true);
Module['FS_createPath']("/libpasteurize", "fixes", true, true);
Module['FS_createPath']("/", "builtins", true, true);
Module['FS_createPath']("/", "copyreg", true, true);
Module['FS_createPath']("/", "html", true, true);
Module['FS_createPath']("/", "http", true, true);
Module['FS_createPath']("/", "queue", true, true);
Module['FS_createPath']("/", "reprlib", true, true);
Module['FS_createPath']("/", "socketserver", true, true);
Module['FS_createPath']("/", "tkinter", true, true);
Module['FS_createPath']("/", "winreg", true, true);
Module['FS_createPath']("/", "xmlrpc", true, true);
Module['FS_createPath']("/", "_dummy_thread", true, true);
Module['FS_createPath']("/", "_markupbase", true, true);
Module['FS_createPath']("/", "_thread", true, true);
Module['FS_createPath']("/", "future-0.18.2-py2.7.egg-info", true, true);
Module['FS_createPath']("/", "six-1.12.0.dist-info", true, true);
Module['FS_createPath']("/", "typing-3.10.0.0.dist-info", true, true);
Module['FS_createPath']("/", "bin", true, true);
Module['FS_createPath']("/", "lib", true, true);
Module['FS_createPath']("/lib", "python2.7", true, true);
Module['FS_createPath']("/lib/python2.7", "site-packages", true, true);
Module['FS_createPath']("/lib/python2.7/site-packages", "pygame_sdl2", true, true);
Module['FS_createPath']("/lib/python2.7/site-packages/pygame_sdl2", "threads", true, true);

          /** @constructor */
          function DataRequest(start, end, audio) {
            this.start = start;
            this.end = end;
            this.audio = audio;
          }
          DataRequest.prototype = {
            requests: {},
            open: function(mode, name) {
              this.name = name;
              this.requests[name] = this;
              Module['addRunDependency']('fp ' + this.name);
            },
            send: function() {},
            onload: function() {
              var byteArray = this.byteArray.subarray(this.start, this.end);
              this.finish(byteArray);
            },
            finish: function(byteArray) {
              var that = this;
      
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);
  
              this.requests[this.name] = null;
            }
          };
      
              var files = metadata['files'];
              for (var i = 0; i < files.length; ++i) {
                new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
              }
      
        
        var indexedDB;
        if (typeof window === 'object') {
          indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        } else if (typeof location !== 'undefined') {
          // worker
          indexedDB = self.indexedDB;
        } else {
          throw 'using IndexedDB to cache data can only be done on a web page or in a web worker';
        }
        var IDB_RO = "readonly";
        var IDB_RW = "readwrite";
        var DB_NAME = "EM_PRELOAD_CACHE";
        var DB_VERSION = 1;
        var METADATA_STORE_NAME = 'METADATA';
        var PACKAGE_STORE_NAME = 'PACKAGES';
        function openDatabase(callback, errback) {
          try {
            var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
          } catch (e) {
            return errback(e);
          }
          openRequest.onupgradeneeded = function(event) {
            var db = event.target.result;

            if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
              db.deleteObjectStore(PACKAGE_STORE_NAME);
            }
            var packages = db.createObjectStore(PACKAGE_STORE_NAME);

            if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
              db.deleteObjectStore(METADATA_STORE_NAME);
            }
            var metadata = db.createObjectStore(METADATA_STORE_NAME);
          };
          openRequest.onsuccess = function(event) {
            var db = event.target.result;
            callback(db);
          };
          openRequest.onerror = function(error) {
            errback(error);
          };
        };

        // This is needed as chromium has a limit on per-entry files in IndexedDB
        // https://cs.chromium.org/chromium/src/content/renderer/indexed_db/webidbdatabase_impl.cc?type=cs&sq=package:chromium&g=0&l=177
        // https://cs.chromium.org/chromium/src/out/Debug/gen/third_party/blink/public/mojom/indexeddb/indexeddb.mojom.h?type=cs&sq=package:chromium&g=0&l=60
        // We set the chunk size to 64MB to stay well-below the limit
        var CHUNK_SIZE = 64 * 1024 * 1024;

        function cacheRemotePackage(
          db,
          packageName,
          packageData,
          packageMeta,
          callback,
          errback
        ) {
          var transactionPackages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
          var packages = transactionPackages.objectStore(PACKAGE_STORE_NAME);
          var chunkSliceStart = 0;
          var nextChunkSliceStart = 0;
          var chunkCount = Math.ceil(packageData.byteLength / CHUNK_SIZE);
          var finishedChunks = 0;
          for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
            nextChunkSliceStart += CHUNK_SIZE;
            var putPackageRequest = packages.put(
              packageData.slice(chunkSliceStart, nextChunkSliceStart),
              'package/' + packageName + '/' + chunkId
            );
            chunkSliceStart = nextChunkSliceStart;
            putPackageRequest.onsuccess = function(event) {
              finishedChunks++;
              if (finishedChunks == chunkCount) {
                var transaction_metadata = db.transaction(
                  [METADATA_STORE_NAME],
                  IDB_RW
                );
                var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
                var putMetadataRequest = metadata.put(
                  {
                    'uuid': packageMeta.uuid,
                    'chunkCount': chunkCount
                  },
                  'metadata/' + packageName
                );
                putMetadataRequest.onsuccess = function(event) {
                  callback(packageData);
                };
                putMetadataRequest.onerror = function(error) {
                  errback(error);
                };
              }
            };
            putPackageRequest.onerror = function(error) {
              errback(error);
            };
          }
        }

        /* Check if there's a cached package, and if so whether it's the latest available */
        function checkCachedPackage(db, packageName, callback, errback) {
          var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
          var metadata = transaction.objectStore(METADATA_STORE_NAME);
          var getRequest = metadata.get('metadata/' + packageName);
          getRequest.onsuccess = function(event) {
            var result = event.target.result;
            if (!result) {
              return callback(false, null);
            } else {
              return callback(PACKAGE_UUID === result['uuid'], result);
            }
          };
          getRequest.onerror = function(error) {
            errback(error);
          };
        }

        function fetchCachedPackage(db, packageName, metadata, callback, errback) {
          var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
          var packages = transaction.objectStore(PACKAGE_STORE_NAME);

          var chunksDone = 0;
          var totalSize = 0;
          var chunkCount = metadata['chunkCount'];
          var chunks = new Array(chunkCount);

          for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
            var getRequest = packages.get('package/' + packageName + '/' + chunkId);
            getRequest.onsuccess = function(event) {
              // If there's only 1 chunk, there's nothing to concatenate it with so we can just return it now
              if (chunkCount == 1) {
                callback(event.target.result);
              } else {
                chunksDone++;
                totalSize += event.target.result.byteLength;
                chunks.push(event.target.result);
                if (chunksDone == chunkCount) {
                  if (chunksDone == 1) {
                    callback(event.target.result);
                  } else {
                    var tempTyped = new Uint8Array(totalSize);
                    var byteOffset = 0;
                    for (var chunkId in chunks) {
                      var buffer = chunks[chunkId];
                      tempTyped.set(new Uint8Array(buffer), byteOffset);
                      byteOffset += buffer.byteLength;
                      buffer = undefined;
                    }
                    chunks = undefined;
                    callback(tempTyped.buffer);
                    tempTyped = undefined;
                  }
                }
              }
            };
            getRequest.onerror = function(error) {
              errback(error);
            };
          }
        }
      
      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
          // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
    
            var files = metadata['files'];
            for (var i = 0; i < files.length; ++i) {
              DataRequest.prototype.requests[files[i].filename].onload();
            }
                Module['removeRunDependency']('datafile_pyapp.data');

      };
      Module['addRunDependency']('datafile_pyapp.data');
    
      if (!Module.preloadResults) Module.preloadResults = {};
    
        function preloadFallback(error) {
          console.error(error);
          console.error('falling back to default preload behavior');
          fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
        };

        openDatabase(
          function(db) {
            checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
              function(useCached, metadata) {
                Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
                if (useCached) {
                  fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, metadata, processPackageData, preloadFallback);
                } else {
                  fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                    function(packageData) {
                      cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                        function(error) {
                          console.error(error);
                          processPackageData(packageData);
                        });
                    }
                  , preloadFallback);
                }
              }
            , preloadFallback);
          }
        , preloadFallback);

        if (Module['setStatus']) Module['setStatus']('Downloading...');
      
    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }
  
   }
   loadPackage({"files": [{"filename": "/six.pyo", "start": 0, "end": 27619, "audio": 0}, {"filename": "/typing.pyo", "start": 27619, "end": 97125, "audio": 0}, {"filename": "/web-presplash-default.jpg", "start": 97125, "end": 321357, "audio": 0}, {"filename": "/future/__init__.pyo", "start": 321357, "end": 321820, "audio": 0}, {"filename": "/future/builtins/__init__.pyo", "start": 321820, "end": 323063, "audio": 0}, {"filename": "/future/builtins/disabled.pyo", "start": 323063, "end": 324088, "audio": 0}, {"filename": "/future/builtins/iterators.pyo", "start": 324088, "end": 324713, "audio": 0}, {"filename": "/future/builtins/misc.pyo", "start": 324713, "end": 326475, "audio": 0}, {"filename": "/future/builtins/new_min_max.pyo", "start": 326475, "end": 328117, "audio": 0}, {"filename": "/future/builtins/newnext.pyo", "start": 328117, "end": 328805, "audio": 0}, {"filename": "/future/builtins/newround.pyo", "start": 328805, "end": 330710, "audio": 0}, {"filename": "/future/builtins/newsuper.pyo", "start": 330710, "end": 332513, "audio": 0}, {"filename": "/future/types/__init__.pyo", "start": 332513, "end": 335110, "audio": 0}, {"filename": "/future/types/newbytes.pyo", "start": 335110, "end": 347907, "audio": 0}, {"filename": "/future/types/newdict.pyo", "start": 347907, "end": 350249, "audio": 0}, {"filename": "/future/types/newint.pyo", "start": 350249, "end": 361564, "audio": 0}, {"filename": "/future/types/newlist.pyo", "start": 361564, "end": 364084, "audio": 0}, {"filename": "/future/types/newmemoryview.pyo", "start": 364084, "end": 364952, "audio": 0}, {"filename": "/future/types/newobject.pyo", "start": 364952, "end": 366474, "audio": 0}, {"filename": "/future/types/newopen.pyo", "start": 366474, "end": 367856, "audio": 0}, {"filename": "/future/types/newrange.pyo", "start": 367856, "end": 373108, "audio": 0}, {"filename": "/future/types/newstr.pyo", "start": 373108, "end": 384780, "audio": 0}, {"filename": "/future/standard_library/__init__.pyo", "start": 384780, "end": 398600, "audio": 0}, {"filename": "/future/backports/__init__.pyo", "start": 398600, "end": 399245, "audio": 0}, {"filename": "/future/backports/_markupbase.pyo", "start": 399245, "end": 407857, "audio": 0}, {"filename": "/future/backports/datetime.pyo", "start": 407857, "end": 458337, "audio": 0}, {"filename": "/future/backports/misc.pyo", "start": 458337, "end": 480175, "audio": 0}, {"filename": "/future/backports/socket.pyo", "start": 480175, "end": 490794, "audio": 0}, {"filename": "/future/backports/socketserver.pyo", "start": 490794, "end": 504432, "audio": 0}, {"filename": "/future/backports/total_ordering.pyo", "start": 504432, "end": 507058, "audio": 0}, {"filename": "/future/backports/email/__init__.pyo", "start": 507058, "end": 508841, "audio": 0}, {"filename": "/future/backports/email/_encoded_words.pyo", "start": 508841, "end": 514395, "audio": 0}, {"filename": "/future/backports/email/_header_value_parser.pyo", "start": 514395, "end": 595485, "audio": 0}, {"filename": "/future/backports/email/_parseaddr.pyo", "start": 595485, "end": 607717, "audio": 0}, {"filename": "/future/backports/email/_policybase.pyo", "start": 607717, "end": 615251, "audio": 0}, {"filename": "/future/backports/email/base64mime.pyo", "start": 615251, "end": 617448, "audio": 0}, {"filename": "/future/backports/email/charset.pyo", "start": 617448, "end": 624451, "audio": 0}, {"filename": "/future/backports/email/encoders.pyo", "start": 624451, "end": 626861, "audio": 0}, {"filename": "/future/backports/email/errors.pyo", "start": 626861, "end": 632353, "audio": 0}, {"filename": "/future/backports/email/feedparser.pyo", "start": 632353, "end": 643552, "audio": 0}, {"filename": "/future/backports/email/generator.pyo", "start": 643552, "end": 654934, "audio": 0}, {"filename": "/future/backports/email/header.pyo", "start": 654934, "end": 668755, "audio": 0}, {"filename": "/future/backports/email/headerregistry.pyo", "start": 668755, "end": 687936, "audio": 0}, {"filename": "/future/backports/email/iterators.pyo", "start": 687936, "end": 689935, "audio": 0}, {"filename": "/future/backports/email/message.pyo", "start": 689935, "end": 707277, "audio": 0}, {"filename": "/future/backports/email/parser.pyo", "start": 707277, "end": 710973, "audio": 0}, {"filename": "/future/backports/email/policy.pyo", "start": 710973, "end": 715030, "audio": 0}, {"filename": "/future/backports/email/quoprimime.pyo", "start": 715030, "end": 722158, "audio": 0}, {"filename": "/future/backports/email/utils.pyo", "start": 722158, "end": 731745, "audio": 0}, {"filename": "/future/backports/email/mime/__init__.pyo", "start": 731745, "end": 731873, "audio": 0}, {"filename": "/future/backports/email/mime/application.pyo", "start": 731873, "end": 732991, "audio": 0}, {"filename": "/future/backports/email/mime/audio.pyo", "start": 732991, "end": 734632, "audio": 0}, {"filename": "/future/backports/email/mime/base.pyo", "start": 734632, "end": 735518, "audio": 0}, {"filename": "/future/backports/email/mime/image.pyo", "start": 735518, "end": 736672, "audio": 0}, {"filename": "/future/backports/email/mime/message.pyo", "start": 736672, "end": 737778, "audio": 0}, {"filename": "/future/backports/email/mime/multipart.pyo", "start": 737778, "end": 738777, "audio": 0}, {"filename": "/future/backports/email/mime/nonmultipart.pyo", "start": 738777, "end": 739719, "audio": 0}, {"filename": "/future/backports/email/mime/text.pyo", "start": 739719, "end": 740832, "audio": 0}, {"filename": "/future/backports/html/__init__.pyo", "start": 740832, "end": 741482, "audio": 0}, {"filename": "/future/backports/html/entities.pyo", "start": 741482, "end": 806766, "audio": 0}, {"filename": "/future/backports/html/parser.pyo", "start": 806766, "end": 820533, "audio": 0}, {"filename": "/future/backports/http/__init__.pyo", "start": 820533, "end": 820655, "audio": 0}, {"filename": "/future/backports/http/client.pyo", "start": 820655, "end": 850161, "audio": 0}, {"filename": "/future/backports/http/cookiejar.pyo", "start": 850161, "end": 898367, "audio": 0}, {"filename": "/future/backports/http/cookies.pyo", "start": 898367, "end": 913592, "audio": 0}, {"filename": "/future/backports/http/server.pyo", "start": 913592, "end": 943783, "audio": 0}, {"filename": "/future/backports/test/badcert.pem", "start": 943783, "end": 945711, "audio": 0}, {"filename": "/future/backports/test/badkey.pem", "start": 945711, "end": 947873, "audio": 0}, {"filename": "/future/backports/test/dh512.pem", "start": 947873, "end": 948275, "audio": 0}, {"filename": "/future/backports/test/https_svn_python_org_root.pem", "start": 948275, "end": 950844, "audio": 0}, {"filename": "/future/backports/test/keycert.passwd.pem", "start": 950844, "end": 952674, "audio": 0}, {"filename": "/future/backports/test/keycert.pem", "start": 952674, "end": 954457, "audio": 0}, {"filename": "/future/backports/test/keycert2.pem", "start": 954457, "end": 956252, "audio": 0}, {"filename": "/future/backports/test/nokia.pem", "start": 956252, "end": 958175, "audio": 0}, {"filename": "/future/backports/test/nullbytecert.pem", "start": 958175, "end": 963610, "audio": 0}, {"filename": "/future/backports/test/nullcert.pem", "start": 963610, "end": 963610, "audio": 0}, {"filename": "/future/backports/test/sha256.pem", "start": 963610, "end": 971954, "audio": 0}, {"filename": "/future/backports/test/ssl_cert.pem", "start": 971954, "end": 972821, "audio": 0}, {"filename": "/future/backports/test/ssl_key.passwd.pem", "start": 972821, "end": 973784, "audio": 0}, {"filename": "/future/backports/test/ssl_key.pem", "start": 973784, "end": 974700, "audio": 0}, {"filename": "/future/backports/test/__init__.pyo", "start": 974700, "end": 974824, "audio": 0}, {"filename": "/future/backports/test/pystone.pyo", "start": 974824, "end": 981561, "audio": 0}, {"filename": "/future/backports/test/ssl_servers.pyo", "start": 981561, "end": 989675, "audio": 0}, {"filename": "/future/backports/test/support.pyo", "start": 989675, "end": 1038912, "audio": 0}, {"filename": "/future/backports/urllib/__init__.pyo", "start": 1038912, "end": 1039036, "audio": 0}, {"filename": "/future/backports/urllib/error.pyo", "start": 1039036, "end": 1041489, "audio": 0}, {"filename": "/future/backports/urllib/parse.pyo", "start": 1041489, "end": 1066854, "audio": 0}, {"filename": "/future/backports/urllib/request.pyo", "start": 1066854, "end": 1138787, "audio": 0}, {"filename": "/future/backports/urllib/response.pyo", "start": 1138787, "end": 1142832, "audio": 0}, {"filename": "/future/backports/urllib/robotparser.pyo", "start": 1142832, "end": 1148962, "audio": 0}, {"filename": "/future/backports/xmlrpc/__init__.pyo", "start": 1148962, "end": 1149086, "audio": 0}, {"filename": "/future/backports/xmlrpc/client.pyo", "start": 1149086, "end": 1183768, "audio": 0}, {"filename": "/future/backports/xmlrpc/server.pyo", "start": 1183768, "end": 1205618, "audio": 0}, {"filename": "/future/moves/__init__.pyo", "start": 1205618, "end": 1205998, "audio": 0}, {"filename": "/future/moves/_dummy_thread.pyo", "start": 1205998, "end": 1206355, "audio": 0}, {"filename": "/future/moves/_markupbase.pyo", "start": 1206355, "end": 1206706, "audio": 0}, {"filename": "/future/moves/_thread.pyo", "start": 1206706, "end": 1207045, "audio": 0}, {"filename": "/future/moves/builtins.pyo", "start": 1207045, "end": 1207423, "audio": 0}, {"filename": "/future/moves/collections.pyo", "start": 1207423, "end": 1208147, "audio": 0}, {"filename": "/future/moves/configparser.pyo", "start": 1208147, "end": 1208463, "audio": 0}, {"filename": "/future/moves/copyreg.pyo", "start": 1208463, "end": 1208878, "audio": 0}, {"filename": "/future/moves/itertools.pyo", "start": 1208878, "end": 1209221, "audio": 0}, {"filename": "/future/moves/pickle.pyo", "start": 1209221, "end": 1209615, "audio": 0}, {"filename": "/future/moves/queue.pyo", "start": 1209615, "end": 1209949, "audio": 0}, {"filename": "/future/moves/reprlib.pyo", "start": 1209949, "end": 1210286, "audio": 0}, {"filename": "/future/moves/socketserver.pyo", "start": 1210286, "end": 1210641, "audio": 0}, {"filename": "/future/moves/subprocess.pyo", "start": 1210641, "end": 1211151, "audio": 0}, {"filename": "/future/moves/sys.pyo", "start": 1211151, "end": 1211475, "audio": 0}, {"filename": "/future/moves/winreg.pyo", "start": 1211475, "end": 1211813, "audio": 0}, {"filename": "/future/moves/dbm/__init__.pyo", "start": 1211813, "end": 1212325, "audio": 0}, {"filename": "/future/moves/dbm/dumb.pyo", "start": 1212325, "end": 1212667, "audio": 0}, {"filename": "/future/moves/dbm/gnu.pyo", "start": 1212667, "end": 1213004, "audio": 0}, {"filename": "/future/moves/dbm/ndbm.pyo", "start": 1213004, "end": 1213342, "audio": 0}, {"filename": "/future/moves/html/__init__.pyo", "start": 1213342, "end": 1214037, "audio": 0}, {"filename": "/future/moves/html/entities.pyo", "start": 1214037, "end": 1214396, "audio": 0}, {"filename": "/future/moves/html/parser.pyo", "start": 1214396, "end": 1214747, "audio": 0}, {"filename": "/future/moves/http/__init__.pyo", "start": 1214747, "end": 1214971, "audio": 0}, {"filename": "/future/moves/http/client.pyo", "start": 1214971, "end": 1215300, "audio": 0}, {"filename": "/future/moves/http/cookiejar.pyo", "start": 1215300, "end": 1215656, "audio": 0}, {"filename": "/future/moves/http/cookies.pyo", "start": 1215656, "end": 1216044, "audio": 0}, {"filename": "/future/moves/http/server.pyo", "start": 1216044, "end": 1216644, "audio": 0}, {"filename": "/future/moves/test/__init__.pyo", "start": 1216644, "end": 1216931, "audio": 0}, {"filename": "/future/moves/test/support.pyo", "start": 1216931, "end": 1217383, "audio": 0}, {"filename": "/future/moves/tkinter/__init__.pyo", "start": 1217383, "end": 1218161, "audio": 0}, {"filename": "/future/moves/tkinter/colorchooser.pyo", "start": 1218161, "end": 1218639, "audio": 0}, {"filename": "/future/moves/tkinter/commondialog.pyo", "start": 1218639, "end": 1219117, "audio": 0}, {"filename": "/future/moves/tkinter/constants.pyo", "start": 1219117, "end": 1219583, "audio": 0}, {"filename": "/future/moves/tkinter/dialog.pyo", "start": 1219583, "end": 1220033, "audio": 0}, {"filename": "/future/moves/tkinter/dnd.pyo", "start": 1220033, "end": 1220475, "audio": 0}, {"filename": "/future/moves/tkinter/filedialog.pyo", "start": 1220475, "end": 1220941, "audio": 0}, {"filename": "/future/moves/tkinter/font.pyo", "start": 1220941, "end": 1221387, "audio": 0}, {"filename": "/future/moves/tkinter/messagebox.pyo", "start": 1221387, "end": 1221857, "audio": 0}, {"filename": "/future/moves/tkinter/scrolledtext.pyo", "start": 1221857, "end": 1222331, "audio": 0}, {"filename": "/future/moves/tkinter/simpledialog.pyo", "start": 1222331, "end": 1222805, "audio": 0}, {"filename": "/future/moves/tkinter/tix.pyo", "start": 1222805, "end": 1223243, "audio": 0}, {"filename": "/future/moves/tkinter/ttk.pyo", "start": 1223243, "end": 1223681, "audio": 0}, {"filename": "/future/moves/urllib/__init__.pyo", "start": 1223681, "end": 1223970, "audio": 0}, {"filename": "/future/moves/urllib/error.pyo", "start": 1223970, "end": 1224530, "audio": 0}, {"filename": "/future/moves/urllib/parse.pyo", "start": 1224530, "end": 1225393, "audio": 0}, {"filename": "/future/moves/urllib/request.pyo", "start": 1225393, "end": 1226626, "audio": 0}, {"filename": "/future/moves/urllib/response.pyo", "start": 1226626, "end": 1227122, "audio": 0}, {"filename": "/future/moves/urllib/robotparser.pyo", "start": 1227122, "end": 1227488, "audio": 0}, {"filename": "/future/moves/xmlrpc/__init__.pyo", "start": 1227488, "end": 1227608, "audio": 0}, {"filename": "/future/moves/xmlrpc/client.pyo", "start": 1227608, "end": 1227923, "audio": 0}, {"filename": "/future/moves/xmlrpc/server.pyo", "start": 1227923, "end": 1228238, "audio": 0}, {"filename": "/future/tests/__init__.pyo", "start": 1228238, "end": 1228351, "audio": 0}, {"filename": "/future/tests/base.pyo", "start": 1228351, "end": 1241260, "audio": 0}, {"filename": "/future/utils/__init__.pyo", "start": 1241260, "end": 1256567, "audio": 0}, {"filename": "/future/utils/surrogateescape.pyo", "start": 1256567, "end": 1260432, "audio": 0}, {"filename": "/past/__init__.pyo", "start": 1260432, "end": 1260722, "audio": 0}, {"filename": "/past/builtins/__init__.pyo", "start": 1260722, "end": 1261818, "audio": 0}, {"filename": "/past/builtins/misc.pyo", "start": 1261818, "end": 1264155, "audio": 0}, {"filename": "/past/builtins/noniterators.pyo", "start": 1264155, "end": 1266278, "audio": 0}, {"filename": "/past/types/__init__.pyo", "start": 1266278, "end": 1266803, "audio": 0}, {"filename": "/past/types/basestring.pyo", "start": 1266803, "end": 1267845, "audio": 0}, {"filename": "/past/types/olddict.pyo", "start": 1267845, "end": 1269607, "audio": 0}, {"filename": "/past/types/oldstr.pyo", "start": 1269607, "end": 1272173, "audio": 0}, {"filename": "/past/utils/__init__.pyo", "start": 1272173, "end": 1273652, "audio": 0}, {"filename": "/past/translation/__init__.pyo", "start": 1273652, "end": 1283526, "audio": 0}, {"filename": "/libfuturize/__init__.pyo", "start": 1283526, "end": 1283638, "audio": 0}, {"filename": "/libfuturize/fixer_util.pyo", "start": 1283638, "end": 1294287, "audio": 0}, {"filename": "/libfuturize/main.pyo", "start": 1294287, "end": 1302379, "audio": 0}, {"filename": "/libfuturize/fixes/__init__.pyo", "start": 1302379, "end": 1304745, "audio": 0}, {"filename": "/libfuturize/fixes/fix_UserDict.pyo", "start": 1304745, "end": 1307204, "audio": 0}, {"filename": "/libfuturize/fixes/fix_absolute_import.pyo", "start": 1307204, "end": 1309268, "audio": 0}, {"filename": "/libfuturize/fixes/fix_add__future__imports_except_unicode_literals.pyo", "start": 1309268, "end": 1310215, "audio": 0}, {"filename": "/libfuturize/fixes/fix_basestring.pyo", "start": 1310215, "end": 1310965, "audio": 0}, {"filename": "/libfuturize/fixes/fix_bytes.pyo", "start": 1310965, "end": 1311919, "audio": 0}, {"filename": "/libfuturize/fixes/fix_cmp.pyo", "start": 1311919, "end": 1312926, "audio": 0}, {"filename": "/libfuturize/fixes/fix_division.pyo", "start": 1312926, "end": 1313132, "audio": 0}, {"filename": "/libfuturize/fixes/fix_division_safe.pyo", "start": 1313132, "end": 1315980, "audio": 0}, {"filename": "/libfuturize/fixes/fix_execfile.pyo", "start": 1315980, "end": 1317012, "audio": 0}, {"filename": "/libfuturize/fixes/fix_future_builtins.pyo", "start": 1317012, "end": 1318594, "audio": 0}, {"filename": "/libfuturize/fixes/fix_future_standard_library.pyo", "start": 1318594, "end": 1319413, "audio": 0}, {"filename": "/libfuturize/fixes/fix_future_standard_library_urllib.pyo", "start": 1319413, "end": 1320310, "audio": 0}, {"filename": "/libfuturize/fixes/fix_input.pyo", "start": 1320310, "end": 1321022, "audio": 0}, {"filename": "/libfuturize/fixes/fix_metaclass.pyo", "start": 1321022, "end": 1326584, "audio": 0}, {"filename": "/libfuturize/fixes/fix_next_call.pyo", "start": 1326584, "end": 1329648, "audio": 0}, {"filename": "/libfuturize/fixes/fix_object.pyo", "start": 1329648, "end": 1330386, "audio": 0}, {"filename": "/libfuturize/fixes/fix_oldstr_wrap.pyo", "start": 1330386, "end": 1331684, "audio": 0}, {"filename": "/libfuturize/fixes/fix_order___future__imports.pyo", "start": 1331684, "end": 1332449, "audio": 0}, {"filename": "/libfuturize/fixes/fix_print.pyo", "start": 1332449, "end": 1334730, "audio": 0}, {"filename": "/libfuturize/fixes/fix_print_with_import.pyo", "start": 1334730, "end": 1335506, "audio": 0}, {"filename": "/libfuturize/fixes/fix_raise.pyo", "start": 1335506, "end": 1337544, "audio": 0}, {"filename": "/libfuturize/fixes/fix_remove_old__future__imports.pyo", "start": 1337544, "end": 1338432, "audio": 0}, {"filename": "/libfuturize/fixes/fix_unicode_keep_u.pyo", "start": 1338432, "end": 1339316, "audio": 0}, {"filename": "/libfuturize/fixes/fix_unicode_literals_import.pyo", "start": 1339316, "end": 1340123, "audio": 0}, {"filename": "/libfuturize/fixes/fix_xrange_with_import.pyo", "start": 1340123, "end": 1340884, "audio": 0}, {"filename": "/libpasteurize/__init__.pyo", "start": 1340884, "end": 1340998, "audio": 0}, {"filename": "/libpasteurize/main.pyo", "start": 1340998, "end": 1346193, "audio": 0}, {"filename": "/libpasteurize/fixes/__init__.pyo", "start": 1346193, "end": 1347123, "audio": 0}, {"filename": "/libpasteurize/fixes/feature_base.pyo", "start": 1347123, "end": 1348804, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_add_all__future__imports.pyo", "start": 1348804, "end": 1349715, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_add_all_future_builtins.pyo", "start": 1349715, "end": 1350595, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_add_future_standard_library_import.pyo", "start": 1350595, "end": 1351467, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_annotations.pyo", "start": 1351467, "end": 1353257, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_division.pyo", "start": 1353257, "end": 1354380, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_features.pyo", "start": 1354380, "end": 1357419, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_fullargspec.pyo", "start": 1357419, "end": 1358285, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_future_builtins.pyo", "start": 1358285, "end": 1359773, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_getcwd.pyo", "start": 1359773, "end": 1360859, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_imports.pyo", "start": 1360859, "end": 1364829, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_imports2.pyo", "start": 1364829, "end": 1374570, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_kwargs.pyo", "start": 1374570, "end": 1378274, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_memoryview.pyo", "start": 1378274, "end": 1379150, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_metaclass.pyo", "start": 1379150, "end": 1381507, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_newstyle.pyo", "start": 1381507, "end": 1382832, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_next.pyo", "start": 1382832, "end": 1384470, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_printfunction.pyo", "start": 1384470, "end": 1385247, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_raise.pyo", "start": 1385247, "end": 1386728, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_raise_.pyo", "start": 1386728, "end": 1388228, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_throw.pyo", "start": 1388228, "end": 1389503, "audio": 0}, {"filename": "/libpasteurize/fixes/fix_unpacking.pyo", "start": 1389503, "end": 1394683, "audio": 0}, {"filename": "/builtins/__init__.pyo", "start": 1394683, "end": 1395236, "audio": 0}, {"filename": "/copyreg/__init__.pyo", "start": 1395236, "end": 1395714, "audio": 0}, {"filename": "/html/__init__.pyo", "start": 1395714, "end": 1396198, "audio": 0}, {"filename": "/html/entities.pyo", "start": 1396198, "end": 1396517, "audio": 0}, {"filename": "/html/parser.pyo", "start": 1396517, "end": 1396933, "audio": 0}, {"filename": "/http/__init__.pyo", "start": 1396933, "end": 1397374, "audio": 0}, {"filename": "/http/client.pyo", "start": 1397374, "end": 1399662, "audio": 0}, {"filename": "/http/cookiejar.pyo", "start": 1399662, "end": 1399893, "audio": 0}, {"filename": "/http/cookies.pyo", "start": 1399893, "end": 1400158, "audio": 0}, {"filename": "/http/server.pyo", "start": 1400158, "end": 1400636, "audio": 0}, {"filename": "/queue/__init__.pyo", "start": 1400636, "end": 1401148, "audio": 0}, {"filename": "/reprlib/__init__.pyo", "start": 1401148, "end": 1401622, "audio": 0}, {"filename": "/socketserver/__init__.pyo", "start": 1401622, "end": 1402109, "audio": 0}, {"filename": "/tkinter/__init__.pyo", "start": 1402109, "end": 1402999, "audio": 0}, {"filename": "/tkinter/colorchooser.pyo", "start": 1402999, "end": 1403464, "audio": 0}, {"filename": "/tkinter/commondialog.pyo", "start": 1403464, "end": 1403929, "audio": 0}, {"filename": "/tkinter/constants.pyo", "start": 1403929, "end": 1404382, "audio": 0}, {"filename": "/tkinter/dialog.pyo", "start": 1404382, "end": 1404819, "audio": 0}, {"filename": "/tkinter/dnd.pyo", "start": 1404819, "end": 1405248, "audio": 0}, {"filename": "/tkinter/filedialog.pyo", "start": 1405248, "end": 1405856, "audio": 0}, {"filename": "/tkinter/font.pyo", "start": 1405856, "end": 1406289, "audio": 0}, {"filename": "/tkinter/messagebox.pyo", "start": 1406289, "end": 1406746, "audio": 0}, {"filename": "/tkinter/scrolledtext.pyo", "start": 1406746, "end": 1407207, "audio": 0}, {"filename": "/tkinter/simpledialog.pyo", "start": 1407207, "end": 1407668, "audio": 0}, {"filename": "/tkinter/tix.pyo", "start": 1407668, "end": 1408093, "audio": 0}, {"filename": "/tkinter/ttk.pyo", "start": 1408093, "end": 1408518, "audio": 0}, {"filename": "/winreg/__init__.pyo", "start": 1408518, "end": 1409033, "audio": 0}, {"filename": "/xmlrpc/__init__.pyo", "start": 1409033, "end": 1409476, "audio": 0}, {"filename": "/xmlrpc/client.pyo", "start": 1409476, "end": 1409706, "audio": 0}, {"filename": "/xmlrpc/server.pyo", "start": 1409706, "end": 1409936, "audio": 0}, {"filename": "/_dummy_thread/__init__.pyo", "start": 1409936, "end": 1410463, "audio": 0}, {"filename": "/_markupbase/__init__.pyo", "start": 1410463, "end": 1410986, "audio": 0}, {"filename": "/_thread/__init__.pyo", "start": 1410986, "end": 1411501, "audio": 0}, {"filename": "/future-0.18.2-py2.7.egg-info/PKG-INFO", "start": 1411501, "end": 1415863, "audio": 0}, {"filename": "/future-0.18.2-py2.7.egg-info/SOURCES.txt", "start": 1415863, "end": 1428854, "audio": 0}, {"filename": "/future-0.18.2-py2.7.egg-info/dependency_links.txt", "start": 1428854, "end": 1428855, "audio": 0}, {"filename": "/future-0.18.2-py2.7.egg-info/entry_points.txt", "start": 1428855, "end": 1428944, "audio": 0}, {"filename": "/future-0.18.2-py2.7.egg-info/top_level.txt", "start": 1428944, "end": 1429092, "audio": 0}, {"filename": "/future-0.18.2-py2.7.egg-info/installed-files.txt", "start": 1429092, "end": 1445416, "audio": 0}, {"filename": "/six-1.12.0.dist-info/LICENSE", "start": 1445416, "end": 1446482, "audio": 0}, {"filename": "/six-1.12.0.dist-info/METADATA", "start": 1446482, "end": 1448422, "audio": 0}, {"filename": "/six-1.12.0.dist-info/WHEEL", "start": 1448422, "end": 1448532, "audio": 0}, {"filename": "/six-1.12.0.dist-info/top_level.txt", "start": 1448532, "end": 1448536, "audio": 0}, {"filename": "/six-1.12.0.dist-info/INSTALLER", "start": 1448536, "end": 1448540, "audio": 0}, {"filename": "/six-1.12.0.dist-info/RECORD", "start": 1448540, "end": 1449077, "audio": 0}, {"filename": "/typing-3.10.0.0.dist-info/LICENSE", "start": 1449077, "end": 1461832, "audio": 0}, {"filename": "/typing-3.10.0.0.dist-info/METADATA", "start": 1461832, "end": 1464097, "audio": 0}, {"filename": "/typing-3.10.0.0.dist-info/WHEEL", "start": 1464097, "end": 1464189, "audio": 0}, {"filename": "/typing-3.10.0.0.dist-info/top_level.txt", "start": 1464189, "end": 1464196, "audio": 0}, {"filename": "/typing-3.10.0.0.dist-info/INSTALLER", "start": 1464196, "end": 1464200, "audio": 0}, {"filename": "/typing-3.10.0.0.dist-info/RECORD", "start": 1464200, "end": 1464773, "audio": 0}, {"filename": "/bin/pasteurize", "start": 1464773, "end": 1465240, "audio": 0}, {"filename": "/bin/futurize", "start": 1465240, "end": 1465703, "audio": 0}, {"filename": "/lib/python2.7/subprocess.pyo", "start": 1465703, "end": 1465819, "audio": 0}, {"filename": "/lib/python2.7/threading.pyo", "start": 1465819, "end": 1470257, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/__init__.pyo", "start": 1470257, "end": 1475163, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/compat.pyo", "start": 1475163, "end": 1478541, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/sprite.pyo", "start": 1478541, "end": 1506762, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/sysfont.pyo", "start": 1506762, "end": 1526868, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/time.pyo", "start": 1526868, "end": 1527057, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/version.pyo", "start": 1527057, "end": 1527553, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/threads/__init__.pyo", "start": 1527553, "end": 1533870, "audio": 0}, {"filename": "/lib/python2.7/site-packages/pygame_sdl2/threads/Py25Queue.pyo", "start": 1533870, "end": 1539421, "audio": 0}], "remote_package_size": 1539421, "package_uuid": "4ab9f483-f663-4497-890d-1f2a90994452"});
  
  })();
  