
document.getElementById('issueInputForm').addEventListener('submit',saveIssues);
//function saveIssues

function saveIssues(e){
  var issueId=chance.guid();
  var issueDescription=document.getElementById('issueDescInput').value;
  // alert(issueDescription);
  var issueAssignedTo=document.getElementById('issueAssignedToInput').value;
  // alert(issueAssignedTo);
  var issueSeverity=document.getElementById('issueSeverityInput').value;
  var issueStatus='Open';

  var issue={
    id:issueId,
    description:issueDescription,
    severity:issueSeverity,
    assignedTo:issueAssignedTo,
    status:issueStatus
  };

  if(localStorage.getItem('issues') == null){
    var issues=[];
    // alert(typeof issues);
    issues.push(issue);
    localStorage.setItem('issues',JSON.stringify(issues));
  }
  else{
    var storedissues=JSON.parse(localStorage.getItem('issues'));
    storedissues.push(issue);
    localStorage.setItem('issues',JSON.stringify(storedissues));
  }

  //reseting the form after adding
  document.getElementById('issueInputForm').reset();
  //issues fetch
  fetchIssues();
  //prevent the submit
  e.preventDefault();
}

function issueClosed(id){
  var issues=JSON.parse(localStorage.getItem('issues'));
  console.log(issues);
  if(issues != null){
    for(var i=0;i<issues.length;i++){
      if(issues[i].id == id){
        issues[i].status='Closed';
      }
    }
  }

  localStorage.setItem('issues',JSON.stringify(issues));

  fetchIssues();
}

function issueDelete(id){
  var issues=JSON.parse(localStorage.getItem('issues'));
  console.log(issues);
  if(issues != null){
    for(var i=0;i<issues.length;i++){
      if(issues[i].id == id){
        issues.splice(i,1);
      }
    }
  }

  localStorage.setItem('issues',JSON.stringify(issues));

  fetchIssues();
}


function fetchIssues(){
  var issues=JSON.parse(localStorage.getItem('issues'));
  // alert(issues.length);
  var issueList=document.getElementById('issueList');
   issueList.innerHTML='';
  if(issues != null){
    for(var i=0;i<issues.length;i++){
      var id=issues[i].id;
      var desc=issues[i].description;
      var severity=issues[i].severity;
      var assignedTo=issues[i].assignedTo;
      var status=issues[i].status;

      issueList.innerHTML+= '<div class="well">'+
                            '<h6>Issue ID:'+id+'</h6>'+
                            '<p><span class="label label-info">'+status+'</span></p>'+
                            '<h3>'+desc+'</h3>'+
                            '<p><span>'+severity+'</span></p>'+
                            '<p><span>'+assignedTo+'</span></p>'+
                            '<button href="#" onclick="issueClosed(\''+id+'\')" class="btn btn-warning">Close</button>'+
                            '<button href="#" onclick="issueDelete(\''+id+'\')" class="btn btn-danger">Delete</button>'+
                            '</div>';

    }


  }

}
