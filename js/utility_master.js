var app = angular.module('question_app', []);
app.controller('question_controller', function ($scope, $http, $sce) {
    
    $scope.getRecordsQuestions = function () {
        $http.get('./php/question_master.php', {
            params: {
                'type': 'load'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.questions = [];
                $scope.paperQuestions = [];
                $scope.questions = response.records;
                $scope.totalquestion = $scope.questions.length;
                
            }
        });
    };
    $scope.getRecordsQuestionsType = function() {
                    $http.get('./php/qtype_master.php', {
                        params: {
                            'type': 'load'
                        }
                    }).success(function(response) {
                        if (response.status == 'OK') {
                            $scope.questionsType = [];
                            $scope.paperQuestionsType = {};
                            $scope.questionsType = response.records;
                        }else{
                            alert('azad');
                        }
                    });
                };
    $scope.getRecordsQuestionsType();
    $scope.getRecordsMedium = function () {
        $http.get('./php/medium_master.php', {
            params: {
                'type': 'load'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.mediums = [];
                $scope.mediumData = {};
                $scope.mediums = response.records;
                $scope.totalmedium = $scope.mediums.length;
            } else {
                alert("medium load found any error class");
            }
        });
    };
    $scope.getRecordsClass = function () {
        $http.get('./php/class_master.php', {
            params: {
                'type': 'load'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.clasess = [];
                $scope.classData = {};
                $scope.clasess = response.records;
                $scope.totalclass = $scope.clasess.length;
            } else {
                alert("class load found any error class");
            }
        });
    };
    $scope.getRecordsSubject = function () {
        $http.get('./php/subject_master.php', {
            params: {
                'type': 'load'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.subjects = [];
                $scope.subjectData = {};
                $scope.subjects = response.records;
                $scope.totalsubject = $scope.subjects.length;
            } else {
                alert("subject load found any error subject");
            }
        });
    };
    $scope.getRecordsChapter = function () {
        $http.get('./php/chapter_master.php', {
            params: {
                'type': 'load'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.chapters = [];
                $scope.chapterData = {};
                $scope.chapters = response.records;
                $scope.totalchapter = $scope.chapters.length;
                $scope.totalchapters = $scope.chapters.length;
            } else {
                alert("chapter load found any error chapter");
            }
        });
    };
    $scope.getRecordsUsers = function () {
        $http.get('./php/user_master.php', {
            params: {
                'type': 'load'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.users = [];
                $scope.users = response.records;
            } else {
                alert("users load found any error chapter");
            }
        });
    };
    $scope.exportData = function () {
        $http.post('./php/data_master.php', {
            params: {
                'type': 'expData'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                alert(response.msg);
            } else {
                alert("export data found an error in js code");
            }
        });
    };
    $scope.saveQuestion = function (type) {
        var data = $.param({
            'data': $scope.paperQuestions,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("./php/question_master.php", data, config).success(function (response) {
            if (response.status == 'OK') {
                if (type == 'edit') {
                    $scope.questions[$scope.index].id = $scope.paperQuestions.id;
                    $scope.questions[$scope.index].class = $scope.paperQuestions.class;
                    $scope.questions[$scope.index].subject = $scope.paperQuestions.subject;
                    $scope.questions[$scope.index].chapter = $scope.paperQuestions.chapter;
                    $scope.questions[$scope.index].question = $scope.paperQuestions.question;
                    $scope.questions[$scope.index].answer = $scope.paperQuestions.answer;
                } else {
                    $scope.questions.push({
                        id: response.data.id,
                        class: response.data.class,
                        subject: response.data.subject,
                        chapter: response.data.chapter,
                        question: response.data.question,
                        answer: response.data.answer
                    });
                }
                $scope.paperQuestions = {};
                alert(response.msg);
                $scope.totalquestion = $scope.questions.length;
            } else {
                alert(response.msg);
                $scope.totalquestion = $scope.questions.length;
            }
        });
    };
    $scope.addQuestion = function () {
        $scope.saveQuestion('add');
    };
    $scope.saveMedium = function (type) {
        var data = $.param({
            'data': $scope.mediumData,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("./php/medium_master.php", data, config).success(function (response) {
            if (response.status == 'OK') {
                if (type == 'edit') {
                    $scope.mediums[$scope.index].id = $scope.mediumData.id;
                    $scope.mediums[$scope.index].mediumName = $scope.mediumData.mediumName;
                } else {
                    $scope.mediums.push({
                        id: response.data.id,
                        mediumName: response.data.mediumName
                    });
                }
                $scope.mediumData = {};
                alert(response.msg);
                $scope.totalmedium = $scope.mediums.length;
            } else {
                alert(response.msg);
                $scope.totalmedium = $scope.mediums.length;
            }
        });
    };
    $scope.addmedium = function () {
        $scope.saveMedium('add');
    };
    $scope.editMedium = function () {
        /*$scope.mediumData = {
            id: medium.id,
            mediumName: medium.mediumName
        };
        $scope.index = $scope.mediums.indexOf(medium);*/
        alert("azad");
        $('#MediumModal').modal('toggle');
    };
    //****************************************/
    $scope.saveClass = function (type) {
        var data = $.param({
            'data': $scope.classData,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("./php/class_master.php", data, config).success(function (response) {
            if (response.status == 'OK') {
                if (type == 'edit') {
                    $scope.clasess[$scope.index].id = $scope.classData.id;
                    $scope.clasess[$scope.index].name = $scope.classData.name;
                } else {
                    $scope.clasess.push({
                        id: response.data.id,
                        name: response.data.name
                    });
                }
                $scope.classData = {};
                alert(response.msg);
                $scope.totalclass = $scope.clasess.length;
            } else {
                alert(response.msg);
            }
        });
    };
    $scope.addClass = function () {
        $scope.saveClass('add');
    };
    //****************************************/
    $scope.saveSubject = function (type) {
        var data = $.param({
            'data': $scope.subjectData,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("./php/subject_master.php", data, config).success(function (response) {
            if (response.status == 'OK') {
                if (type == 'edit') {
                    $scope.subjects[$scope.index].id = $scope.subjectData.id;
                    $scope.subjects[$scope.index].name = $scope.subjectData.name;
                } else {
                    $scope.subjects.push({
                        id: response.data.id,
                        name: response.data.name
                    });
                }
                $scope.subjectData = {};
                alert(response.msg);
                $scope.totalsubject = $scope.subjects.length;
            } else {
                alert(response.msg);
            }
        });
    };
    $scope.addSubject = function () {
        $scope.saveSubject('add');
    };
    //****************************************/
    $scope.saveChapter = function (type) {
        var data = $.param({
            'data': $scope.chapterData,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("./php/chapter_master.php", data, config).success(function (response) {
            if (response.status == 'OK') {
                if (type == 'edit') {
                    $scope.chapters[$scope.index].id = $scope.chapterData.id;
                    $scope.chapters[$scope.index].name = $scope.chapterData.name;
                    $scope.chapters[$scope.index].subId = $scope.chapterData.subId;
                } else {
                    $scope.chapters.push({
                        id: response.data.id,
                        name: response.data.name,
                        subId: response.data.subId
                    });
                }
                $scope.chapterData = {};
                alert(response.msg);
                $scope.totalchapter = $scope.chapters.length;
            } else {
                alert(response.msg);
            }
        });
    };
    $scope.addChapter = function () {
        $scope.saveChapter('add');
    };
    /***************************************************/
});
