# Geranium
MVVM frontend framework built on the principle of control inversion container. 
Using current tools such as JSX, Angular, e.t.c. and technology, such as AJAX and WebSockets, allows you to design applications with interchangeable modules.

# Application architecture
* State - your all-time accessable data
* View - represents your templating result
* ViewState - state which you can show any time 
* ViewModel - your communication from user

# Example
````typescript
@Routed('/app/vm/show')
class VM extends ViewModel {
  view(){ return '<h1 onclick='alert({{id}});' data-field="templated">{{templated}}</h1>'; }
  synchronizer(){
    return {
      method:'post',
      url:'/'
    }
  }
  templated:string='data from server';
  id:number=0;
  
  alert(id:number){
    console.log(id);
  }
}

let vm = new VM();
vm.display('.app');
````
````html
<!-- route: /app/vm/show -->
<h1>Server-side data</h1>
<!-- on-click => console: 2 
````
# Train trip
See full example in the project 'traintrip.csproj'
