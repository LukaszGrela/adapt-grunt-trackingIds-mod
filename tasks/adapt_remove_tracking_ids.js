/*
 * grunt-adapt-tracking-ids
 * https://github.com/kevadsett/trackingIds-plugin
 *
 * Copyright (c) 2013 Kev Adsett
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    
    grunt.registerTask('adapt_remove_tracking_ids', 'Automates the removal of SCORM tracking IDs.', function() {
        var options = this.options();
        function removeTrackingIds(blocks, course){
            
            for(var i = 0; i < blocks.length; i++) {
                if(blocks[i]._trackingId != -1)
                    delete blocks[i]._trackingId;
            }
            delete course._latestTrackingId;
            grunt.log.writeln("Tracking IDs removed.");
            grunt.file.write(options.courseFile, JSON.stringify(course, null, "    "));
            grunt.file.write(options.blocksFile, JSON.stringify(blocks, null, "    "));
        }
        
        removeTrackingIds(grunt.file.readJSON(options.blocksFile), grunt.file.readJSON(options.courseFile));
    });
};
