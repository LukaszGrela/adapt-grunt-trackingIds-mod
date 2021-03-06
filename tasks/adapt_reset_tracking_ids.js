/*
 * grunt-adapt-tracking-ids
 * https://github.com/kevadsett/trackingIds-plugin
 *
 * Copyright (c) 2013 Kev Adsett
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    
    grunt.registerTask('adapt_reset_tracking_ids', 'Automates the insertion of SCORM tracking IDs, overwriting any that are already present.', function() {
        
        var options = this.options({
            _latestTrackingId: -1,
        });
        
        function resetTrackingIds(blocks, course){
            
            for(var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if(block._trackingId != -1) {
                    block._trackingId = ++options._latestTrackingId;
                    grunt.log.writeln("Adding tracking ID: " + block._trackingId + " to block " + block._id);
                    options._latestTrackingId = block._trackingId;
                }
            }
            course._latestTrackingId = options._latestTrackingId;
            grunt.log.writeln("The latest tracking ID is " + course._latestTrackingId);
            grunt.file.write(options.courseFile, JSON.stringify(course, null, "    "));
            grunt.file.write(options.blocksFile, JSON.stringify(blocks, null, "    "));
        }
        
        resetTrackingIds(grunt.file.readJSON(options.blocksFile), grunt.file.readJSON(options.courseFile));
    });
};
