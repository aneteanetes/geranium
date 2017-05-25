using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace traintrip
{
    public class backend : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }


        public void ProcessRequest(HttpContext context)
        {
            var jsonResponce = string.Empty;

            var query = context.Request.Params;
            switch (query["command"])
            {
                case "list":
                    {
                        var rnd = new Random();
                        jsonResponce = JsonConvert.SerializeObject(new
                        {
                            data = new train[]
                            {
                                new train(){name="VSOE",stations=10, now=rnd.Next(0,10) },
                                new train(){ name="Golden Eagle",stations=5,now=rnd.Next(0,5)},
                                new train(){ name="El Transcantábrico",stations=15,now=rnd.Next(0,15)},
                                new train(){ name="Al-Andalus",stations=25,now=rnd.Next(0,25)},
                                new train(){ name="Glacier",stations=4,now=rnd.Next(0,4)},
                                new train(){ name="The Blue Train",stations=11,now=rnd.Next(0,11)},
                            }
                        });
                        break;
                    }
                default:
                    jsonResponce = JsonConvert.SerializeObject(new { time = DateTime.Now.ToString("HH:mm:ss") });
                    break;
            }


            context.Response.Write(jsonResponce);
            context.ApplicationInstance.CompleteRequest();
        }
    }

    class train
    {
        public string name { get; set; }
        public int stations { get; set; }
        public int now { get; set; }
    }
}