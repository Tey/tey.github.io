
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
      var PACKAGE_NAME = 'pythonhome.data';
      var REMOTE_PACKAGE_BASE = 'pythonhome.data';
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
  Module['FS_createPath']("/", "lib", true, true);
Module['FS_createPath']("/lib", "python2.7", true, true);
Module['FS_createPath']("/lib/python2.7", "encodings", true, true);
Module['FS_createPath']("/lib/python2.7", "importlib", true, true);
Module['FS_createPath']("/lib/python2.7", "json", true, true);
Module['FS_createPath']("/lib/python2.7", "xml", true, true);
Module['FS_createPath']("/lib/python2.7/xml", "etree", true, true);
Module['FS_createPath']("/lib/python2.7/xml", "parsers", true, true);
Module['FS_createPath']("/lib/python2.7", "email", true, true);
Module['FS_createPath']("/lib/python2.7", "logging", true, true);

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
                Module['removeRunDependency']('datafile_pythonhome.data');

      };
      Module['addRunDependency']('datafile_pythonhome.data');
    
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
   loadPackage({"files": [{"filename": "/lib/python2.7/site.pyo", "start": 0, "end": 13487, "audio": 0}, {"filename": "/lib/python2.7/os.pyo", "start": 13487, "end": 28486, "audio": 0}, {"filename": "/lib/python2.7/posixpath.pyo", "start": 28486, "end": 37090, "audio": 0}, {"filename": "/lib/python2.7/stat.pyo", "start": 37090, "end": 39645, "audio": 0}, {"filename": "/lib/python2.7/genericpath.pyo", "start": 39645, "end": 42241, "audio": 0}, {"filename": "/lib/python2.7/warnings.pyo", "start": 42241, "end": 52444, "audio": 0}, {"filename": "/lib/python2.7/linecache.pyo", "start": 52444, "end": 55081, "audio": 0}, {"filename": "/lib/python2.7/types.pyo", "start": 55081, "end": 57600, "audio": 0}, {"filename": "/lib/python2.7/UserDict.pyo", "start": 57600, "end": 66945, "audio": 0}, {"filename": "/lib/python2.7/_abcoll.pyo", "start": 66945, "end": 87139, "audio": 0}, {"filename": "/lib/python2.7/abc.pyo", "start": 87139, "end": 90943, "audio": 0}, {"filename": "/lib/python2.7/_weakrefset.pyo", "start": 90943, "end": 100333, "audio": 0}, {"filename": "/lib/python2.7/copy_reg.pyo", "start": 100333, "end": 104692, "audio": 0}, {"filename": "/lib/python2.7/traceback.pyo", "start": 104692, "end": 112122, "audio": 0}, {"filename": "/lib/python2.7/sysconfig.pyo", "start": 112122, "end": 127006, "audio": 0}, {"filename": "/lib/python2.7/re.pyo", "start": 127006, "end": 133577, "audio": 0}, {"filename": "/lib/python2.7/sre_compile.pyo", "start": 133577, "end": 145835, "audio": 0}, {"filename": "/lib/python2.7/sre_parse.pyo", "start": 145835, "end": 166719, "audio": 0}, {"filename": "/lib/python2.7/sre_constants.pyo", "start": 166719, "end": 172828, "audio": 0}, {"filename": "/lib/python2.7/codecs.pyo", "start": 172828, "end": 192962, "audio": 0}, {"filename": "/lib/python2.7/__future__.pyo", "start": 192962, "end": 195162, "audio": 0}, {"filename": "/lib/python2.7/ast.pyo", "start": 195162, "end": 202347, "audio": 0}, {"filename": "/lib/python2.7/copy.pyo", "start": 202347, "end": 211942, "audio": 0}, {"filename": "/lib/python2.7/weakref.pyo", "start": 211942, "end": 225394, "audio": 0}, {"filename": "/lib/python2.7/platform.pyo", "start": 225394, "end": 253164, "audio": 0}, {"filename": "/lib/python2.7/string.pyo", "start": 253164, "end": 265852, "audio": 0}, {"filename": "/lib/python2.7/io.pyo", "start": 265852, "end": 267920, "audio": 0}, {"filename": "/lib/python2.7/tempfile.pyo", "start": 267920, "end": 282848, "audio": 0}, {"filename": "/lib/python2.7/random.pyo", "start": 282848, "end": 299751, "audio": 0}, {"filename": "/lib/python2.7/hashlib.pyo", "start": 299751, "end": 306101, "audio": 0}, {"filename": "/lib/python2.7/struct.pyo", "start": 306101, "end": 306334, "audio": 0}, {"filename": "/lib/python2.7/dummy_thread.pyo", "start": 306334, "end": 309411, "audio": 0}, {"filename": "/lib/python2.7/collections.pyo", "start": 309411, "end": 326916, "audio": 0}, {"filename": "/lib/python2.7/keyword.pyo", "start": 326916, "end": 328733, "audio": 0}, {"filename": "/lib/python2.7/heapq.pyo", "start": 328733, "end": 340219, "audio": 0}, {"filename": "/lib/python2.7/argparse.pyo", "start": 340219, "end": 394827, "audio": 0}, {"filename": "/lib/python2.7/textwrap.pyo", "start": 394827, "end": 400419, "audio": 0}, {"filename": "/lib/python2.7/gettext.pyo", "start": 400419, "end": 417447, "audio": 0}, {"filename": "/lib/python2.7/locale.pyo", "start": 417447, "end": 469251, "audio": 0}, {"filename": "/lib/python2.7/functools.pyo", "start": 469251, "end": 474586, "audio": 0}, {"filename": "/lib/python2.7/glob.pyo", "start": 474586, "end": 476882, "audio": 0}, {"filename": "/lib/python2.7/fnmatch.pyo", "start": 476882, "end": 479229, "audio": 0}, {"filename": "/lib/python2.7/pickle.pyo", "start": 479229, "end": 512456, "audio": 0}, {"filename": "/lib/python2.7/colorsys.pyo", "start": 512456, "end": 515788, "audio": 0}, {"filename": "/lib/python2.7/contextlib.pyo", "start": 515788, "end": 518792, "audio": 0}, {"filename": "/lib/python2.7/zipfile.pyo", "start": 518792, "end": 555414, "audio": 0}, {"filename": "/lib/python2.7/shutil.pyo", "start": 555414, "end": 568875, "audio": 0}, {"filename": "/lib/python2.7/difflib.pyo", "start": 568875, "end": 596508, "audio": 0}, {"filename": "/lib/python2.7/inspect.pyo", "start": 596508, "end": 621418, "audio": 0}, {"filename": "/lib/python2.7/dis.pyo", "start": 621418, "end": 627024, "audio": 0}, {"filename": "/lib/python2.7/opcode.pyo", "start": 627024, "end": 632993, "audio": 0}, {"filename": "/lib/python2.7/tokenize.pyo", "start": 632993, "end": 644240, "audio": 0}, {"filename": "/lib/python2.7/token.pyo", "start": 644240, "end": 647968, "audio": 0}, {"filename": "/lib/python2.7/tarfile.pyo", "start": 647968, "end": 708562, "audio": 0}, {"filename": "/lib/python2.7/urlparse.pyo", "start": 708562, "end": 719542, "audio": 0}, {"filename": "/lib/python2.7/StringIO.pyo", "start": 719542, "end": 725836, "audio": 0}, {"filename": "/lib/python2.7/atexit.pyo", "start": 725836, "end": 727403, "audio": 0}, {"filename": "/lib/python2.7/base64.pyo", "start": 727403, "end": 735025, "audio": 0}, {"filename": "/lib/python2.7/bisect.pyo", "start": 735025, "end": 736756, "audio": 0}, {"filename": "/lib/python2.7/calendar.pyo", "start": 736756, "end": 759544, "audio": 0}, {"filename": "/lib/python2.7/cgi.pyo", "start": 759544, "end": 782729, "audio": 0}, {"filename": "/lib/python2.7/chunk.pyo", "start": 782729, "end": 786099, "audio": 0}, {"filename": "/lib/python2.7/cmd.pyo", "start": 786099, "end": 794382, "audio": 0}, {"filename": "/lib/python2.7/commands.pyo", "start": 794382, "end": 796061, "audio": 0}, {"filename": "/lib/python2.7/compileall.pyo", "start": 796061, "end": 801383, "audio": 0}, {"filename": "/lib/python2.7/cookielib.pyo", "start": 801383, "end": 841665, "audio": 0}, {"filename": "/lib/python2.7/Cookie.pyo", "start": 841665, "end": 856876, "audio": 0}, {"filename": "/lib/python2.7/cProfile.pyo", "start": 856876, "end": 862000, "audio": 0}, {"filename": "/lib/python2.7/decimal.pyo", "start": 862000, "end": 953888, "audio": 0}, {"filename": "/lib/python2.7/dummy_threading.pyo", "start": 953888, "end": 954790, "audio": 0}, {"filename": "/lib/python2.7/getopt.pyo", "start": 954790, "end": 958782, "audio": 0}, {"filename": "/lib/python2.7/gzip.pyo", "start": 958782, "end": 971086, "audio": 0}, {"filename": "/lib/python2.7/hmac.pyo", "start": 971086, "end": 973977, "audio": 0}, {"filename": "/lib/python2.7/imghdr.pyo", "start": 973977, "end": 978348, "audio": 0}, {"filename": "/lib/python2.7/mimetools.pyo", "start": 978348, "end": 985663, "audio": 0}, {"filename": "/lib/python2.7/mimetypes.pyo", "start": 985663, "end": 998027, "audio": 0}, {"filename": "/lib/python2.7/ntpath.pyo", "start": 998027, "end": 1008027, "audio": 0}, {"filename": "/lib/python2.7/nturl2path.pyo", "start": 1008027, "end": 1009492, "audio": 0}, {"filename": "/lib/python2.7/numbers.pyo", "start": 1009492, "end": 1019038, "audio": 0}, {"filename": "/lib/python2.7/optparse.pyo", "start": 1019038, "end": 1059573, "audio": 0}, {"filename": "/lib/python2.7/pstats.pyo", "start": 1059573, "end": 1081836, "audio": 0}, {"filename": "/lib/python2.7/py_compile.pyo", "start": 1081836, "end": 1085028, "audio": 0}, {"filename": "/lib/python2.7/Queue.pyo", "start": 1085028, "end": 1091134, "audio": 0}, {"filename": "/lib/python2.7/quopri.pyo", "start": 1091134, "end": 1096544, "audio": 0}, {"filename": "/lib/python2.7/repr.pyo", "start": 1096544, "end": 1101731, "audio": 0}, {"filename": "/lib/python2.7/rfc822.pyo", "start": 1101731, "end": 1122740, "audio": 0}, {"filename": "/lib/python2.7/shlex.pyo", "start": 1122740, "end": 1129728, "audio": 0}, {"filename": "/lib/python2.7/socket.pyo", "start": 1129728, "end": 1142529, "audio": 0}, {"filename": "/lib/python2.7/stringprep.pyo", "start": 1142529, "end": 1156598, "audio": 0}, {"filename": "/lib/python2.7/_strptime.pyo", "start": 1156598, "end": 1168342, "audio": 0}, {"filename": "/lib/python2.7/sunau.pyo", "start": 1168342, "end": 1181859, "audio": 0}, {"filename": "/lib/python2.7/urllib2.pyo", "start": 1181859, "end": 1221303, "audio": 0}, {"filename": "/lib/python2.7/urllib.pyo", "start": 1221303, "end": 1264458, "audio": 0}, {"filename": "/lib/python2.7/UserList.pyo", "start": 1264458, "end": 1270741, "audio": 0}, {"filename": "/lib/python2.7/UserString.pyo", "start": 1270741, "end": 1284344, "audio": 0}, {"filename": "/lib/python2.7/uuid.pyo", "start": 1284344, "end": 1300532, "audio": 0}, {"filename": "/lib/python2.7/uu.pyo", "start": 1300532, "end": 1304657, "audio": 0}, {"filename": "/lib/python2.7/wave.pyo", "start": 1304657, "end": 1318226, "audio": 0}, {"filename": "/lib/python2.7/webbrowser.pyo", "start": 1318226, "end": 1336202, "audio": 0}, {"filename": "/lib/python2.7/_sysconfigdata.pyo", "start": 1336202, "end": 1336346, "audio": 0}, {"filename": "/lib/python2.7/encodings/__init__.pyo", "start": 1336346, "end": 1339167, "audio": 0}, {"filename": "/lib/python2.7/encodings/aliases.pyo", "start": 1339167, "end": 1347334, "audio": 0}, {"filename": "/lib/python2.7/encodings/utf_8.pyo", "start": 1347334, "end": 1349098, "audio": 0}, {"filename": "/lib/python2.7/encodings/hex_codec.pyo", "start": 1349098, "end": 1351672, "audio": 0}, {"filename": "/lib/python2.7/encodings/zlib_codec.pyo", "start": 1351672, "end": 1355117, "audio": 0}, {"filename": "/lib/python2.7/encodings/latin_1.pyo", "start": 1355117, "end": 1357212, "audio": 0}, {"filename": "/lib/python2.7/encodings/ascii.pyo", "start": 1357212, "end": 1359279, "audio": 0}, {"filename": "/lib/python2.7/encodings/base64_codec.pyo", "start": 1359279, "end": 1361903, "audio": 0}, {"filename": "/lib/python2.7/encodings/cp437.pyo", "start": 1361903, "end": 1369804, "audio": 0}, {"filename": "/lib/python2.7/encodings/idna.pyo", "start": 1369804, "end": 1376124, "audio": 0}, {"filename": "/lib/python2.7/encodings/mbcs.pyo", "start": 1376124, "end": 1377878, "audio": 0}, {"filename": "/lib/python2.7/encodings/raw_unicode_escape.pyo", "start": 1377878, "end": 1379885, "audio": 0}, {"filename": "/lib/python2.7/encodings/string_escape.pyo", "start": 1379885, "end": 1381818, "audio": 0}, {"filename": "/lib/python2.7/encodings/unicode_escape.pyo", "start": 1381818, "end": 1383777, "audio": 0}, {"filename": "/lib/python2.7/encodings/utf_16_be.pyo", "start": 1383777, "end": 1385585, "audio": 0}, {"filename": "/lib/python2.7/encodings/utf_16_le.pyo", "start": 1385585, "end": 1387393, "audio": 0}, {"filename": "/lib/python2.7/encodings/utf_16.pyo", "start": 1387393, "end": 1392326, "audio": 0}, {"filename": "/lib/python2.7/encodings/utf_32_be.pyo", "start": 1392326, "end": 1394134, "audio": 0}, {"filename": "/lib/python2.7/importlib/__init__.pyo", "start": 1394134, "end": 1395264, "audio": 0}, {"filename": "/lib/python2.7/json/__init__.pyo", "start": 1395264, "end": 1398040, "audio": 0}, {"filename": "/lib/python2.7/json/decoder.pyo", "start": 1398040, "end": 1405695, "audio": 0}, {"filename": "/lib/python2.7/json/scanner.pyo", "start": 1405695, "end": 1407862, "audio": 0}, {"filename": "/lib/python2.7/json/encoder.pyo", "start": 1407862, "end": 1416665, "audio": 0}, {"filename": "/lib/python2.7/xml/__init__.pyo", "start": 1416665, "end": 1417209, "audio": 0}, {"filename": "/lib/python2.7/xml/etree/__init__.pyo", "start": 1417209, "end": 1417332, "audio": 0}, {"filename": "/lib/python2.7/xml/etree/ElementTree.pyo", "start": 1417332, "end": 1451439, "audio": 0}, {"filename": "/lib/python2.7/xml/etree/ElementPath.pyo", "start": 1451439, "end": 1458907, "audio": 0}, {"filename": "/lib/python2.7/xml/parsers/expat.pyo", "start": 1458907, "end": 1459114, "audio": 0}, {"filename": "/lib/python2.7/xml/parsers/__init__.pyo", "start": 1459114, "end": 1459241, "audio": 0}, {"filename": "/lib/python2.7/email/base64mime.pyo", "start": 1459241, "end": 1461470, "audio": 0}, {"filename": "/lib/python2.7/logging/__init__.pyo", "start": 1461470, "end": 1493625, "audio": 0}], "remote_package_size": 1493625, "package_uuid": "74c01cf3-9086-478d-bab8-28c79763a47b"});
  
  })();
  